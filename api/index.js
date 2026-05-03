const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const app = express();
const PORT = process.env.PORT || 5000;

// MIDDLEWARE SETUP
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// ============================================================================
// API ROUTES - PRODUCTS
// ============================================================================

// Helper function to get all sold out product IDs by checking orders
async function getSoldOutProductIds() {
  const { data: orders } = await supabase.from('orders').select('items');
  let soldOutIds = new Set();
  if (orders) {
    orders.forEach(order => {
      if (order.items && Array.isArray(order.items)) {
        order.items.forEach(item => {
          if (item.productId) soldOutIds.add(item.productId);
        });
      }
    });
  }
  return soldOutIds;
}

// Get all products
app.get('/api/products', async (req, res) => {
  try {
    const { category, minPrice, maxPrice, search } = req.query;
    let query = supabase.from('products').select('*');

    if (category) query = query.eq('category', category);
    if (minPrice) query = query.gte('price', parseInt(minPrice));
    if (maxPrice) query = query.lte('price', parseInt(maxPrice));
    if (search) query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);

    const { data, error } = await query;
    if (error) throw error;

    const soldOutIds = await getSoldOutProductIds();
    const productsWithStatus = data.map(p => ({
      ...p,
      status: soldOutIds.has(p.id) ? 'sold_out' : 'available'
    }));

    res.json({ success: true, data: productsWithStatus, count: productsWithStatus.length });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get single product
app.get('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let { data, error } = await supabase.from('products').select('*').eq('id', id).single();
    
    const soldOutIds = await getSoldOutProductIds();

    if (error) {
      if (soldOutIds.has(id)) {
        return res.json({ success: true, data: { id, status: 'sold_out' } });
      }
      throw error;
    }

    data.status = soldOutIds.has(id) ? 'sold_out' : 'available';
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get categories
app.get('/api/categories', async (req, res) => {
  try {
    const { data, error } = await supabase.from('categories').select('*');
    if (error) throw error;
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============================================================================
// API ROUTES - NEWSLETTER
// ============================================================================

app.post('/api/newsletter/subscribe', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, error: 'Email is required' });

    const { data, error } = await supabase.from('newsletter_subscribers').insert([{ email }]).select();
    if (error) {
      if (error.code === '23505') return res.json({ success: true, message: 'Already subscribed!' });
      throw error;
    }
    res.json({ success: true, message: 'Subscribed!', data: data[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============================================================================
// API ROUTES - REVIEWS
// ============================================================================

app.get('/api/products/:id/reviews', async (req, res) => {
  try {
    const { data, error } = await supabase.from('reviews').select('*').eq('product_id', req.params.id).order('created_at', { ascending: false });
    if (error) throw error;
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/products/:id/reviews', async (req, res) => {
  try {
    const { user_name, rating, comment } = req.body;
    const { data, error } = await supabase.from('reviews').insert([{ product_id: req.params.id, user_name, rating, comment }]).select();
    if (error) throw error;
    res.json({ success: true, data: data[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============================================================================
// API ROUTES - SHOPPING CART (Persistent)
// ============================================================================

// Create or update cart
app.post('/api/carts', async (req, res) => {
  try {
    const { id, items, user_id } = req.body;
    let result;
    if (id) {
      const { data, error } = await supabase.from('carts').update({ items, user_id, updated_at: new Date() }).eq('id', id).select();
      if (error) throw error;
      result = data[0];
    } else {
      const { data, error } = await supabase.from('carts').insert([{ items: items || [], user_id }]).select();
      if (error) throw error;
      result = data[0];
    }
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update item quantity
app.get('/api/carts/:id', async (req, res) => {
  try {
    const { data, error } = await supabase.from('carts').select('*').eq('id', req.params.id).single();
    if (error && error.code !== 'PGRST116') throw error;
    if (!data) return res.status(404).json({ success: false, error: 'Cart not found' });

    const items = data.items || [];
    const subtotal = items.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);
    const shipping = 0; // Free shipping
    const tax = subtotal * 0.12; 
    const total = subtotal + shipping + tax;

    res.json({ success: true, data: { id: data.id, items, subtotal, shipping, tax, total } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.put('/api/carts/:id/items/:productId', async (req, res) => {
  try {
    const { id, productId } = req.params;
    const { quantity, size, color } = req.body;
    
    const { data: cart } = await supabase.from('carts').select('items').eq('id', id).single();
    let items = cart.items || [];
    const index = items.findIndex(i => i.productId === productId && i.size === size && i.color === color);
    
    if (index > -1) {
      if (quantity <= 0) items.splice(index, 1);
      else items[index].quantity = quantity;
      
      await supabase.from('carts').update({ items, updated_at: new Date() }).eq('id', id);
    }
    res.json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.delete('/api/carts/:id/items/:productId', async (req, res) => {
  try {
    const { id, productId } = req.params;
    const { size, color } = req.query;
    
    const { data: cart } = await supabase.from('carts').select('items').eq('id', id).single();
    let items = cart.items || [];
    const newItems = items.filter(i => !(i.productId === productId && i.size === size && i.color === color));
    
    await supabase.from('carts').update({ items: newItems, updated_at: new Date() }).eq('id', id);
    res.json({ success: true, data: newItems });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Add item to cart
app.post('/api/carts/:id/items', async (req, res) => {
  try {
    const { id } = req.params;
    const { productId, quantity, size, color, name, price, image } = req.body;

    // 1. Try to get the existing cart
    let { data: cart, error: getError } = await supabase.from('carts').select('items').eq('id', id).single();
    
    let items = [];
    
    // If cart doesn't exist, create a new one
    if (getError && getError.code === 'PGRST116') {
      const { data: newCart, error: createError } = await supabase.from('carts').insert([{ id, items: [] }]).select().single();
      if (createError) throw createError;
      items = [];
    } else if (getError) {
      throw getError;
    } else {
      items = cart.items || [];
    }

    // 2. Update items list
    const existingIndex = items.findIndex(i => i.productId === productId && i.size === size && i.color === color);

    if (existingIndex > -1) {
      // For thrift items, restrict quantity to exactly 1
      items[existingIndex].quantity = 1;
    } else {
      // Prevent adding sold out items to cart
      const soldOutIds = await getSoldOutProductIds();
      if (soldOutIds.has(productId)) {
        return res.status(400).json({ success: false, error: 'This item is already sold out!' });
      }

      // Get product details for the cart (optional but helpful)
      const { data: product } = await supabase.from('products').select('name, price, image').eq('id', productId).single();

      items.push({ 
        productId, 
        quantity, 
        size, 
        color,
        name: product?.name || name || 'Product',
        price: product?.price || price || 0,
        image: product?.image || image || ''
      });
    }

    // 3. Save back to database
    const { error: updateError } = await supabase.from('carts').update({ items, updated_at: new Date() }).eq('id', id);
    if (updateError) throw updateError;
    
    res.json({ success: true, data: items });
  } catch (error) {
    console.error('Cart Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============================================================================
// API ROUTES - ORDERS
// ============================================================================

app.post('/api/orders', async (req, res) => {
  try {
    const { cartId, customerInfo } = req.body;
    const { data: cart, error: cartError } = await supabase.from('carts').select('items').eq('id', cartId).single();
    
    if (cartError || !cart || cart.items.length === 0) {
      return res.status(400).json({ success: false, error: 'Cart is empty or not found' });
    }

    // Calculate totals
    const subtotal = cart.items.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);
    const shipping = 0; // Free shipping
    const total = subtotal + shipping;

    const orderData = {
      order_id: `ORD-${Date.now()}`,
      cart_id: cartId,
      items: cart.items,
      customer_info: customerInfo,
      shipping_info: customerInfo,
      subtotal,
      tax: 0,
      shipping,
      total,
      status: 'pending'
    };

    const { data, error } = await supabase.from('orders').insert([orderData]).select().single();
    if (error) throw error;

    if (cart.items && cart.items.length > 0) {
      for (const item of cart.items) {
        const { data } = await supabase.from('products').select('id').eq('id', item.productId);
        // If product wasn't found in DB (it was a local placeholder), insert it without status column
        if (!data || data.length === 0) {
          const insertPayload = {
            id: item.productId,
            name: item.name || 'Product',
            price: item.price || 0,
            image: item.image || '',
            category: item.productId ? item.productId.split('-')[0] : 'coquette'
          };
          const { error: insErr } = await supabase.from('products').insert([insertPayload]);
          if (insErr) console.error("Failed to insert placeholder product:", insErr);
        }
      }
    }

    // Optional: Clear cart after order
    await supabase.from('carts').update({ items: [] }).eq('id', cartId);

    res.json({ success: true, message: 'Order created!', data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/orders', async (req, res) => {
  try {
    const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update order status
app.put('/api/orders/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // 1. Try to update by 'id' (the database UUID)
    let { data, error } = await supabase.from('orders').update({ status }).eq('id', id).select();

    // 2. If not found, try by 'order_id' (the ORD- string)
    if ((!data || data.length === 0)) {
      const { data: retryData } = await supabase.from('orders').update({ status }).eq('order_id', id).select();
      data = retryData;
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ success: false, error: 'Order not found in database' });
    }

    res.json({ success: true, data: data[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete an order
app.delete('/api/orders/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let { error } = await supabase.from('orders').delete().eq('id', id);
    
    if (error) {
      const { error: retryError } = await supabase.from('orders').delete().eq('order_id', id);
      if (retryError) throw retryError;
    }
    
    res.json({ success: true, message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============================================================================
// ADMIN - PRODUCT MANAGEMENT
// ============================================================================

app.post('/api/products', async (req, res) => {
  try {
    const { data, error } = await supabase.from('products').insert([req.body]).select().single();
    if (error) throw error;
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.put('/api/products/:id', async (req, res) => {
  try {
    const { data, error } = await supabase.from('products').update(req.body).eq('id', req.params.id).select();
    if (error) throw error;
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    const { error } = await supabase.from('products').delete().eq('id', req.params.id);
    if (error) throw error;
    res.json({ success: true, message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🎀 Backend running on http://localhost:${PORT}`);
  });
}

module.exports = app;
