// ============================================================================
// KITTY'S FINDS - Backend Server
// Main Express server setup with CORS and route handlers
// EDIT: Change PORT number if needed, add database connection later
// ============================================================================

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 5000;

// ============================================================================
// MIDDLEWARE SETUP
// ============================================================================
app.use(cors()); // Enable Cross-Origin requests from frontend
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded data

// ============================================================================
// IN-MEMORY DATABASE (Replace with real database like MongoDB/PostgreSQL)
// EDIT: Connect to your actual database here
// ============================================================================

// Custom Products Database - 25 unique products matching frontend inventory
// ============================================================================
const products = [
  // COQUETTE COLLECTION (10 items)
  { id: 'coquette-1', name: 'Blush Ribbon Slip Dress', price: 799, currency: '₱', category: 'Coquette', description: 'Elegant blush-colored slip dress with delicate ribbon details', longDescription: 'Experience timeless elegance with our Blush Ribbon Slip Dress. Crafted from premium silk, this dress features delicate ribbon detailing. Perfect for creating a romantic, coquette aesthetic.', image: '/images/C1.jpg', sizes: ['XS', 'S', 'M'], colors: ['Blush', 'White', 'Rose'], rating: 5, reviews: 247 },
  { id: 'coquette-2', name: 'Pastel Cloud Cardigan', price: 649, currency: '₱', category: 'Coquette', description: 'Soft, cloud-like cardigan in pastel pink', longDescription: 'Wrap yourself in luxury with our Pastel Cloud Cardigan. Made from the softest materials, this cardigan feels like wearing a cloud. The pastel pink hue is both calming and sophisticated.', image: '/images/C2.jpg', sizes: ['XS', 'S', 'M'], colors: ['Pastel Pink', 'Lavender'], rating: 5, reviews: 98 },
  { id: 'coquette-3', name: 'Romantic Corset Blouse', price: 749, currency: '₱', category: 'Coquette', description: 'Victorian-inspired corset blouse with lace trim', longDescription: 'Channel your inner romantic with this stunning Corset Blouse. Features intricate lace trim and structured boning. The white silk base contrasts beautifully with delicate embroidery.', image: '/images/C3.jpg', sizes: ['XS', 'S', 'M'], colors: ['White', 'Cream', 'Blush'], rating: 5, reviews: 311 },
  { id: 'coquette-4', name: 'Silk Charmeuse Slip', price: 599, currency: '₱', category: 'Coquette', description: 'Luxurious silk charmeuse slip with adjustable straps', longDescription: 'Indulge in luxury with our Silk Charmeuse Slip. Made from premium silk, this slip is buttery smooth. The adjustable straps ensure the perfect fit, while the elegant drape creates a sophisticated silhouette.', image: '/images/C4.jpg', sizes: ['XS', 'S', 'M'], colors: ['Ivory', 'Champagne', 'Rose Gold'], rating: 5, reviews: 156 },
  { id: 'coquette-5', name: 'Lace Trim Camisole', price: 499, currency: '₱', category: 'Coquette', description: 'Delicate camisole with French lace trim', longDescription: 'Add a touch of elegance to your wardrobe with our Lace Trim Camisole. Featuring authentic French lace detailing, this camisole is both delicate and durable. Perfect as a standalone piece or layered.', image: '/images/C5.jpg', sizes: ['XS', 'S', 'M'], colors: ['White', 'Black', 'Pink'], rating: 4, reviews: 203 },
  { id: 'coquette-6', name: 'Pearl Button Cardigan', price: 699, currency: '₱', category: 'Coquette', description: 'Creamy cardigan adorned with vintage pearl buttons', longDescription: 'Channel vintage charm with our Pearl Button Cardigan. Each button is a vintage pearl, adding timeless sophistication. The creamy color is versatile and pairs beautifully with any wardrobe.', image: '/images/C6.jpg', sizes: ['XS', 'S', 'M'], colors: ['Cream', 'Blush', 'Lavender'], rating: 5, reviews: 189 },
  { id: 'coquette-7', name: 'Velvet Babydoll Dress', price: 849, currency: '₱', category: 'Coquette', description: 'Soft velvet babydoll dress with bow details', longDescription: 'Step into a fairytale with our Velvet Babydoll Dress. This playful yet sophisticated piece features the softest velvet and darling bow details. The babydoll silhouette is universally flattering and incredibly comfortable.', image: '/images/C7.jpg', sizes: ['XS', 'S', 'M'], colors: ['Pink', 'Rose', 'Mauve'], rating: 5, reviews: 275 },
  { id: 'coquette-8', name: 'Sheer Overlay Top', price: 549, currency: '₱', category: 'Coquette', description: 'Ethereal sheer overlay with embroidered details', longDescription: 'Create an ethereal look with our Sheer Overlay Top. The delicate embroidery details catch the light beautifully. Layer it over your favorite camisole for an enchanting ensemble.', image: '/images/C8.jpg', sizes: ['XS', 'S', 'M'], colors: ['White', 'Blush', 'Peach'], rating: 4, reviews: 142 },
  { id: 'coquette-9', name: 'Satin Bow Headpiece', price: 399, currency: '₱', category: 'Coquette', description: 'Luxurious satin bow for hair styling', longDescription: 'Complete your coquette look with this stunning Satin Bow Headpiece. Made from premium satin in vibrant colors. Perfect for parties, photoshoots, or everyday glamour.', image: '/images/C9.jpg', sizes: ['One Size'], colors: ['Pink', 'White', 'Black'], rating: 5, reviews: 421 },
  { id: 'coquette-10', name: 'Lace Thigh Highs', price: 299, currency: '₱', category: 'Coquette', description: 'Delicate lace thigh-high socks with bow trim', longDescription: 'Add a touch of playful femininity with our Lace Thigh Highs. These delicate socks feature intricate lace patterns and adorable bow trims. Perfect for pairing with skirts and dresses.', image: '/images/C10.jpg', sizes: ['One Size'], colors: ['White', 'Black', 'Pink'], rating: 5, reviews: 356 },
  // Y2K COLLECTION (10 items)
  { id: 'y2k-1', name: 'Y2K Butterfly Mini Skirt', price: 549, currency: '₱', category: 'Y2K', description: 'Low-rise mini skirt with butterfly print', longDescription: 'Channel peak Y2K energy with this iconic Butterfly Mini Skirt. The low-rise cut and bold butterfly print are straight from the early 2000s playbook. Pair with a baby tee and platform sneakers.', image: '/images/Y1.jpg', sizes: ['XS', 'S', 'M'], colors: ['Black', 'Pink', 'Purple'], rating: 5, reviews: 132 },
  { id: 'y2k-2', name: 'Cargo Pants with Straps', price: 699, currency: '₱', category: 'Y2K', description: 'Classic cargo pants with multiple pockets and straps', longDescription: 'No Y2K wardrobe is complete without cargo pants. Our version features the perfect amount of pockets and functional straps. Perfect for styling with crop tops for an authentic early-2000s vibe.', image: '/images/Y2.jpg', sizes: ['XS', 'S', 'M'], colors: ['Khaki', 'Black', 'Hot Pink'], rating: 5, reviews: 267 },
  { id: 'y2k-3', name: 'Metallic Crop Top', price: 449, currency: '₱', category: 'Y2K', description: 'Shiny metallic crop top perfect for the club', longDescription: 'Get ready to shine in our Metallic Crop Top. The reflective metallic finish catches every light. Whether you\'re hitting the club or going to a festival, this top delivers serious Y2K vibes.', image: '/images/Y3.jpg', sizes: ['XS', 'S', 'M'], colors: ['Silver', 'Gold', 'Purple'], rating: 4, reviews: 198 },
  { id: 'y2k-4', name: 'Baby Tee Graphic Print', price: 399, currency: '₱', category: 'Y2K', description: 'Vintage-style baby tee with trendy graphic', longDescription: 'The ultimate Y2K staple, our Baby Tee features a vintage graphic print that screams early-2000s nostalgia. A timeless piece that every fashion enthusiast needs.', image: '/images/Y4.jpg', sizes: ['XS', 'S', 'M'], colors: ['White', 'Black', 'Pink'], rating: 5, reviews: 445 },
  { id: 'y2k-5', name: 'Butterfly Hair Clips', price: 299, currency: '₱', category: 'Y2K', description: 'Colorful butterfly hair clips set', longDescription: 'Accessorize your Y2K look with these iconic Butterfly Hair Clips. This set includes multiple colors and sizes. A must-have for any 2000s enthusiast!', image: '/images/Y5.jpg', sizes: ['One Size'], colors: ['Rainbow', 'Pink', 'Purple'], rating: 5, reviews: 512 },
  { id: 'y2k-6', name: 'Choker Necklace Set', price: 349, currency: '₱', category: 'Y2K', description: 'Multi-piece choker set with various styles', longDescription: 'Go back to the 2000s with our Choker Necklace Set. This collection includes multiple styles and materials. Layer them up for a customized look that\'s authentically Y2K.', image: '/images/Y6.jpg', sizes: ['One Size'], colors: ['Black', 'Silver', 'Rainbow'], rating: 5, reviews: 389 },
  { id: 'y2k-7', name: 'Holographic Windbreaker', price: 799, currency: '₱', category: 'Y2K', description: 'Futuristic holographic windbreaker jacket', longDescription: 'Make a statement with our Holographic Windbreaker. This eye-catching jacket features a reflective holographic finish. Perfect for standing out at festivals, parties, or just around town.', image: '/images/Y7.jpg', sizes: ['XS', 'S', 'M'], colors: ['Silver', 'Iridescent'], rating: 5, reviews: 234 },
  { id: 'y2k-8', name: 'Rhinestone Tank Top', price: 499, currency: '₱', category: 'Y2K', description: 'Sparkly tank top covered in rhinestones', longDescription: 'Shine bright like a diamond in our Rhinestone Tank Top. Every inch is covered in sparkling rhinestones. A Y2K party essential!', image: '/images/Y8.jpg', sizes: ['XS', 'S', 'M'], colors: ['Black', 'White', 'Pink'], rating: 5, reviews: 267 },
  { id: 'y2k-9', name: 'Platform Chunky Sneakers', price: 899, currency: '₱', category: 'Y2K', description: 'Iconic platform chunky sneakers with colorful details', longDescription: 'The ultimate Y2K shoe, our Platform Chunky Sneakers feature the signature chunky sole and bold colorways. Comfortable enough for all-day wear, cool enough to turn heads.', image: '/images/Y9.jpg', sizes: ['5', '6', '7', '8', '9', '10'], colors: ['White/Pink', 'White/Purple', 'Black/Silver'], rating: 5, reviews: 198 },
  { id: 'y2k-10', name: 'Butterfly Chain Wallet', price: 449, currency: '₱', category: 'Y2K', description: 'Cute butterfly-shaped wallet with chain strap', longDescription: 'Carry your essentials in style with our Butterfly Chain Wallet. This adorable butterfly-shaped wallet comes with a chain strap. Perfect for nights out!', image: '/images/Y10.jpg', sizes: ['One Size'], colors: ['Pink', 'Purple', 'Blue'], rating: 5, reviews: 356 },
  // FAIRYCORE COLLECTION (5 items)
  { id: 'fairycore-1', name: 'Tulle Ballerina Skirt', price: 749, currency: '₱', category: 'Fairycore', description: 'Ethereal tulle skirt with multiple layers', longDescription: 'Step into an enchanted forest with our Tulle Ballerina Skirt. The multiple layers of delicate tulle create an ethereal, magical silhouette. Perfect for creating a fairycore look.', image: '/images/f1.jpg', sizes: ['XS', 'S', 'M'], colors: ['Mint Green', 'Lavender', 'Blush'], rating: 5, reviews: 274 },
  { id: 'fairycore-2', name: 'Floral Fairy Maxi Dress', price: 999, currency: '₱', category: 'Fairycore', description: 'Long flowing dress with enchanted floral print', longDescription: 'Become a woodland fairy in our stunning Floral Fairy Maxi Dress. This floor-length gown features an enchanting floral print. The ultimate fairycore statement piece.', image: '/images/f2.jpg', sizes: ['XS', 'S', 'M'], colors: ['Sage Green', 'Ivory', 'Dusty Rose'], rating: 5, reviews: 189 },
  { id: 'fairycore-3', name: 'Woodland Fairy Wings', price: 599, currency: '₱', category: 'Fairycore', description: 'Delicate iridescent fairy wings accessory', longDescription: 'Complete your fairycore transformation with these enchanting Fairy Wings. Made with iridescent materials, they shimmer and shine. Perfect for festivals and photo shoots.', image: '/images/f3.jpg', sizes: ['One Size'], colors: ['Iridescent', 'Rainbow', 'Mint'], rating: 5, reviews: 421 },
  { id: 'fairycore-4', name: 'Moss Green Corset Top', price: 649, currency: '₱', category: 'Fairycore', description: 'Enchanted corset top in moss green with nature details', longDescription: 'Embrace your inner woodland fairy with our Moss Green Corset Top. This structured top is perfect for pairing with skirts or pants for a magical fairycore aesthetic.', image: '/images/f4.jpg', sizes: ['XS', 'S', 'M'], colors: ['Moss Green', 'Forest Green', 'Sage'], rating: 5, reviews: 156 },
  { id: 'fairycore-5', name: 'Forest Spirit Crown', price: 699, currency: '₱', category: 'Fairycore', description: 'Magical crown with woodland elements and gemstones', longDescription: 'Reign as the forest spirit with our enchanting Crown. Adorned with woodland elements and gemstones. Perfect for completing your fairycore look at special occasions.', image: '/images/f5.jpg', sizes: ['One Size'], colors: ['Gold/Green', 'Silver/Mint', 'Bronze/Sage'], rating: 5, reviews: 312 },
];

// Mock Shopping Carts - stores active shopping sessions
const carts = new Map(); // { cartId: { items: [...], createdAt: timestamp } }

// Mock Orders Database - stores completed orders
const orders = [];

// ============================================================================
// API ROUTES - PRODUCTS
// ============================================================================

/**
 * GET /api/products
 * Retrieve all products with optional filtering
 * Query params: category, minPrice, maxPrice, search
 * EDIT: Add pagination (limit, offset) for large product lists
 */
app.get('/api/products', (req, res) => {
  try {
    const { category, minPrice, maxPrice, search } = req.query;
    
    let filteredProducts = [...products];

    // Filter by category if provided
    if (category) {
      filteredProducts = filteredProducts.filter(p => p.category === category);
    }

    // Filter by price range if provided
    if (minPrice) {
      filteredProducts = filteredProducts.filter(p => p.price >= parseInt(minPrice));
    }
    if (maxPrice) {
      filteredProducts = filteredProducts.filter(p => p.price <= parseInt(maxPrice));
    }

    // Filter by search term in name or description
    if (search) {
      const searchLower = search.toLowerCase();
      filteredProducts = filteredProducts.filter(p =>
        p.name.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower)
      );
    }

    res.json({
      success: true,
      data: filteredProducts,
      count: filteredProducts.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * GET /api/products/:id
 * Retrieve a single product by ID
 * EDIT: Add related products recommendation
 */
app.get('/api/products/:id', (req, res) => {
  try {
    const product = products.find(p => p.id === req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found',
      });
    }

    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * GET /api/categories
 * Retrieve all unique product categories
 * Useful for navigation filters
 */
app.get('/api/categories', (req, res) => {
  try {
    const categories = [...new Set(products.map(p => p.category))];
    res.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// ============================================================================
// API ROUTES - SHOPPING CART
// ============================================================================

/**
 * POST /api/cart
 * Create a new shopping cart session
 * Returns: cartId to track this session
 */
app.post('/api/cart', (req, res) => {
  try {
    const cartId = uuidv4();
    carts.set(cartId, {
      items: [],
      createdAt: new Date(),
    });

    res.json({
      success: true,
      data: { cartId },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * GET /api/cart/:cartId
 * Retrieve shopping cart items
 * EDIT: Add cart calculation (subtotal, tax, total)
 */
app.get('/api/cart/:cartId', (req, res) => {
  try {
    const cart = carts.get(req.params.cartId);

    if (!cart) {
      return res.status(404).json({
        success: false,
        error: 'Cart not found',
      });
    }

    // Calculate cart totals
    const subtotal = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.08; // 8% tax rate - EDIT: Change tax rate as needed
    const total = subtotal + tax;

    res.json({
      success: true,
      data: {
        cartId: req.params.cartId,
        items: cart.items,
        subtotal: parseFloat(subtotal.toFixed(2)),
        tax: parseFloat(tax.toFixed(2)),
        total: parseFloat(total.toFixed(2)),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * POST /api/cart/:cartId/add
 * Add item to shopping cart
 * Body: { productId, quantity, size, color }
 */
app.post('/api/cart/:cartId/add', (req, res) => {
  try {
    const cart = carts.get(req.params.cartId);

    if (!cart) {
      return res.status(404).json({
        success: false,
        error: 'Cart not found',
      });
    }

    const { productId, quantity, size, color } = req.body;
    const product = products.find(p => p.id === productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found',
      });
    }

    // Check if item already exists in cart with same size/color
    const existingItem = cart.items.find(
      item => item.productId === productId && item.size === size && item.color === color
    );

    if (existingItem) {
      // Update quantity if item exists
      existingItem.quantity += quantity;
    } else {
      // Add new item to cart
      cart.items.push({
        productId,
        name: product.name,
        price: product.price,
        quantity,
        size,
        color,
        image: product.image,
      });
    }

    res.json({
      success: true,
      message: 'Item added to cart',
      data: cart.items,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * DELETE /api/cart/:cartId/remove/:productId
 * Remove item from cart
 * Query: size, color (to identify specific item variant)
 */
app.delete('/api/cart/:cartId/remove/:productId', (req, res) => {
  try {
    const cart = carts.get(req.params.cartId);

    if (!cart) {
      return res.status(404).json({
        success: false,
        error: 'Cart not found',
      });
    }

    const { size, color } = req.query;
    cart.items = cart.items.filter(
      item => !(item.productId === req.params.productId && item.size === size && item.color === color)
    );

    res.json({
      success: true,
      message: 'Item removed from cart',
      data: cart.items,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * PUT /api/cart/:cartId/update/:productId
 * Update item quantity in cart
 * Body: { quantity, size, color }
 */
app.put('/api/cart/:cartId/update/:productId', (req, res) => {
  try {
    const cart = carts.get(req.params.cartId);

    if (!cart) {
      return res.status(404).json({
        success: false,
        error: 'Cart not found',
      });
    }

    const { quantity, size, color } = req.body;
    const item = cart.items.find(
      i => i.productId === req.params.productId && i.size === size && i.color === color
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        error: 'Item not found in cart',
      });
    }

    // Update quantity or remove if quantity is 0 or negative
    if (quantity <= 0) {
      cart.items = cart.items.filter(i => i !== item);
    } else {
      item.quantity = quantity;
    }

    res.json({
      success: true,
      message: 'Cart updated',
      data: cart.items,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// ============================================================================
// API ROUTES - ORDERS
// ============================================================================

/**
 * POST /api/orders
 * Create a new order from cart
 * Body: { cartId, customerInfo: { name, email, address, phone } }
 * EDIT: Add payment processing integration (Stripe, etc.)
 */
app.post('/api/orders', (req, res) => {
  try {
    const { cartId, customerInfo } = req.body;
    const cart = carts.get(cartId);

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Cart is empty or not found',
      });
    }

    // Validate customer info
    if (!customerInfo || !customerInfo.name || !customerInfo.email || !customerInfo.address) {
      return res.status(400).json({
        success: false,
        error: 'Missing required customer information',
      });
    }

    // Parse name into firstName and lastName
    const nameParts = customerInfo.name.split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    // Calculate order totals
    const subtotal = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.08;
    const shipping = 10; // Flat shipping fee
    const total = subtotal + tax + shipping;

    // Parse address
    const addressParts = customerInfo.address.split(', ');
    const address = addressParts[0] || '';
    const city = addressParts[1] || '';
    const state = addressParts[2] ? addressParts[2].split(' ')[0] : '';
    const zipCode = addressParts[2] ? addressParts[2].split(' ')[1] : '';
    const country = addressParts[3] || 'United States';

    // Create order object with structured shipping info
    const order = {
      id: uuidv4(),
      orderId: uuidv4(),
      cartId,
      items: cart.items,
      shippingInfo: {
        firstName,
        lastName,
        email: customerInfo.email,
        phone: customerInfo.phone,
        address,
        city,
        state,
        zipCode,
        country
      },
      customerInfo,
      subtotal: parseFloat(subtotal.toFixed(2)),
      tax: parseFloat(tax.toFixed(2)),
      shipping: parseFloat(shipping.toFixed(2)),
      total: parseFloat(total.toFixed(2)),
      status: 'pending', // EDIT: Add payment status check before marking as 'confirmed'
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Save order
    orders.push(order);

    // Clear cart
    carts.delete(cartId);

    res.json({
      success: true,
      message: 'Order created successfully',
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/**
 * GET /api/orders
 * Admin: Retrieve all orders
 */
app.get('/api/orders', (req, res) => {
  try {
    res.json({
      success: true,
      data: orders,
      count: orders.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/orders/:orderId
 * Retrieve order details by order ID
 */
app.get('/api/orders/:orderId', (req, res) => {
  try {
    const order = orders.find(o => o.orderId === req.params.orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Order not found',
      });
    }

    res.json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// ============================================================================
// ADMIN API ROUTES - PRODUCT MANAGEMENT
// ============================================================================

/**
 * POST /api/products
 * Admin: Add a new product
 * Body: { id, name, price, category, description, image, sizes, colors }
 */
app.post('/api/products', (req, res) => {
  try {
    const { id, name, price, category, description, image, sizes, colors } = req.body;

    if (!id || !name || !price || !category) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: id, name, price, category'
      });
    }

    // Check if product already exists
    if (products.find(p => p.id === id)) {
      return res.status(400).json({
        success: false,
        error: 'Product with this ID already exists'
      });
    }

    const newProduct = {
      id,
      name,
      price: parseFloat(price),
      category,
      description: description || '',
      longDescription: description || '',
      image: image || 'https://via.placeholder.com/300',
      sizes: Array.isArray(sizes) ? sizes : [],
      colors: Array.isArray(colors) ? colors : [],
      rating: 0,
      reviews: 0
    };

    products.push(newProduct);

    res.json({
      success: true,
      message: 'Product added successfully',
      data: newProduct
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * PUT /api/products/:id
 * Admin: Update an existing product
 * Body: { name, price, category, description, image, sizes, colors }
 */
app.put('/api/products/:id', (req, res) => {
  try {
    const product = products.find(p => p.id === req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }

    const { name, price, category, description, image, sizes, colors } = req.body;

    // Update fields if provided
    if (name) product.name = name;
    if (price !== undefined) product.price = parseFloat(price);
    if (category) product.category = category;
    if (description) {
      product.description = description;
      product.longDescription = description;
    }
    if (image) product.image = image;
    if (sizes) product.sizes = Array.isArray(sizes) ? sizes : [];
    if (colors) product.colors = Array.isArray(colors) ? colors : [];

    res.json({
      success: true,
      message: 'Product updated successfully',
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * DELETE /api/products/:id
 * Admin: Delete a product
 */
app.delete('/api/products/:id', (req, res) => {
  try {
    const index = products.findIndex(p => p.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }

    const deletedProduct = products.splice(index, 1);

    res.json({
      success: true,
      message: 'Product deleted successfully',
      data: deletedProduct[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ============================================================================
// ADMIN API ROUTES - ORDER MANAGEMENT
// ============================================================================

/**
 * PUT /api/orders/:id
 * Admin: Update order status
 * Body: { status } - status can be: pending, confirmed, processing, shipped, delivered, cancelled
 */
app.put('/api/orders/:id', (req, res) => {
  try {
    // Find order by id or orderId
    const order = orders.find(o => o.id === req.params.id || o.orderId === req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Order not found'
      });
    }

    const { status } = req.body;
    const validStatuses = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];

    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        error: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
      });
    }

    order.status = status;
    order.updatedAt = new Date();

    res.json({
      success: true,
      message: 'Order status updated successfully',
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ============================================================================
// HEALTH CHECK
// ============================================================================
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running!' });
});

// ============================================================================
// START SERVER
// ============================================================================
app.listen(PORT, () => {
  console.log(`🎀 Kitty's Finds Backend is running on http://localhost:${PORT}`);
  console.log(`📝 API Documentation:`);
  console.log(`   GET  /api/products - Get all products`);
  console.log(`   GET  /api/categories - Get all categories`);
  console.log(`   POST /api/orders - Create order`);
});
