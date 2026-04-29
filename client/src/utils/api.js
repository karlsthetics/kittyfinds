// ============================================================================
// API Utility Functions
// Handles all backend communication with error handling
// EDIT: Change API_BASE_URL if backend is on different host/port
// ============================================================================

// EDIT: Change this URL to match your backend server
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

/**
 * Fetch all products with optional filters
 * @param {object} filters - { category, minPrice, maxPrice, search }
 * @returns {Promise} Array of products
 */
export async function fetchProducts(filters = {}) {
  try {
    const params = new URLSearchParams();
    if (filters.category) params.append('category', filters.category);
    if (filters.minPrice) params.append('minPrice', filters.minPrice);
    if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
    if (filters.search) params.append('search', filters.search);

    const response = await fetch(`${API_BASE_URL}/products?${params.toString()}`);
    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || 'Failed to fetch products');
    }

    return data.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

/**
 * Fetch a single product by ID
 * @param {string} productId - Product ID
 * @returns {Promise} Product object
 */
export async function fetchProductById(productId) {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${productId}`);
    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || 'Product not found');
    }

    return data.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
}

/**
 * Fetch all product categories
 * @returns {Promise} Array of category names
 */
export async function fetchCategories() {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`);
    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || 'Failed to fetch categories');
    }

    return data.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}

/**
 * Create a new shopping cart session
 * @returns {Promise} Cart ID
 */
export async function createCart() {
  try {
    const response = await fetch(`${API_BASE_URL}/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || 'Failed to create cart');
    }

    return data.data.cartId;
  } catch (error) {
    console.error('Error creating cart:', error);
    throw error;
  }
}

/**
 * Fetch cart contents
 * @param {string} cartId - Shopping cart ID
 * @returns {Promise} Cart object with items and totals
 */
export async function fetchCart(cartId) {
  try {
    const response = await fetch(`${API_BASE_URL}/cart/${cartId}`);
    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || 'Failed to fetch cart');
    }

    return data.data;
  } catch (error) {
    console.error('Error fetching cart:', error);
    throw error;
  }
}

/**
 * Add item to cart
 * @param {string} cartId - Shopping cart ID
 * @param {object} item - { productId, quantity, size, color }
 * @returns {Promise} Updated cart items
 */
export async function addToCart(cartId, item) {
  try {
    const response = await fetch(`${API_BASE_URL}/cart/${cartId}/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });
    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || 'Failed to add item to cart');
    }

    return data.data;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
}

/**
 * Update item quantity in cart
 * @param {string} cartId - Shopping cart ID
 * @param {string} productId - Product ID
 * @param {object} update - { quantity, size, color }
 * @returns {Promise} Updated cart items
 */
export async function updateCartItem(cartId, productId, update) {
  try {
    const response = await fetch(`${API_BASE_URL}/cart/${cartId}/update/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(update),
    });
    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || 'Failed to update cart');
    }

    return data.data;
  } catch (error) {
    console.error('Error updating cart:', error);
    throw error;
  }
}

/**
 * Remove item from cart
 * @param {string} cartId - Shopping cart ID
 * @param {string} productId - Product ID
 * @param {string} size - Product size
 * @param {string} color - Product color
 * @returns {Promise} Updated cart items
 */
export async function removeFromCart(cartId, productId, size, color) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/cart/${cartId}/remove/${productId}?size=${size}&color=${color}`,
      {
        method: 'DELETE',
      }
    );
    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || 'Failed to remove item from cart');
    }

    return data.data;
  } catch (error) {
    console.error('Error removing from cart:', error);
    throw error;
  }
}

/**
 * Create order from cart
 * @param {string} cartId - Shopping cart ID
 * @param {object} customerInfo - { name, email, address, phone }
 * @returns {Promise} Order confirmation object
 */
export async function createOrder(cartId, customerInfo) {
  try {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cartId,
        customerInfo,
      }),
    });
    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || 'Failed to create order');
    }

    return data.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
}

/**
 * Fetch order details
 * @param {string} orderId - Order ID
 * @returns {Promise} Order object
 */
export async function fetchOrder(orderId) {
  try {
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}`);
    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || 'Order not found');
    }

    return data.data;
  } catch (error) {
    console.error('Error fetching order:', error);
    throw error;
  }
}
