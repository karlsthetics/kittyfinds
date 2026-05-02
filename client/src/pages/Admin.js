import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';
import './styles/Admin.css';

const Admin = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(null); // null = loading, true/false = status
  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [showProductForm, setShowProductForm] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    price: '',
    category: 'coquette',
    image: '',
    sizes: [],
    colors: [],
    description: ''
  });

  useEffect(() => {
    checkAdminStatus();
  }, []);

  const checkAdminStatus = async () => {
    try {
      if (!supabase) {
        setIsAdmin(false);
        setTimeout(() => navigate('/login'), 2000);
        return;
      }

      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setIsAdmin(false);
        setTimeout(() => navigate('/login'), 2000);
        return;
      }

      // Check profiles table for is_admin flag or role
      const { data, error } = await supabase
        .from('profiles')
        .select('is_admin, role')
        .eq('id', user.id)
        .single();

      if (error || (!data?.is_admin && data?.role !== 'admin')) {
        setIsAdmin(false);
        setTimeout(() => navigate('/'), 3000);
      } else {
        setIsAdmin(true);
        fetchProducts();
        fetchOrders();
      }
    } catch (error) {
      console.error('Error checking admin status:', error);
      setIsAdmin(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/products`);
      const data = await response.json();
      if (data.success) {
        setProducts(data.data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders`);
      const data = await response.json();
      if (data.success) {
        setOrders(data.data);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        sizes: formData.sizes.split(',').map(s => s.trim()).filter(s => s),
        colors: formData.colors.split(',').map(c => c.trim()).filter(c => c),
        image: formData.image || 'https://via.placeholder.com/300'
      };

      if (formData.id) {
        // Update existing product
        const response = await fetch(`${API_BASE_URL}/products/${formData.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData)
        });
        const data = await response.json();
        if (data.success) {
          alert('Product updated successfully!');
        }
      } else {
        // Add new product
        const newId = `${formData.category}-${products.length + 1}`;
        const response = await fetch(`${API_BASE_URL}/products`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...productData, id: newId })
        });
        const data = await response.json();
        if (data.success) {
          alert('Product added successfully!');
        }
      }

      setFormData({
        id: '',
        name: '',
        price: '',
        category: 'coquette',
        image: '',
        sizes: [],
        colors: [],
        description: ''
      });
      setShowProductForm(false);
      fetchProducts();
    } catch (error) {
      alert('Error adding/updating product: ' + error.message);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
          method: 'DELETE'
        });
        const data = await response.json();
        if (data.success) {
          alert('Product deleted successfully!');
          fetchProducts();
        }
      } catch (error) {
        alert('Error deleting product: ' + error.message);
      }
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await response.json();
      if (data.success) {
        alert(`Order status updated to ${newStatus}!`);
        fetchOrders();
      }
    } catch (error) {
      alert('Error updating order: ' + error.message);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (window.confirm('Are you sure you want to delete this order? This action cannot be undone.')) {
      try {
        const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
          method: 'DELETE'
        });
        const data = await response.json();
        if (data.success) {
          alert('Order deleted successfully!');
          fetchOrders();
        } else {
          throw new Error(data.error);
        }
      } catch (error) {
        alert('Error deleting order: ' + error.message);
      }
    }
  };

  const handleEditProduct = (product) => {
    setFormData({
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
      image: product.image,
      sizes: product.sizes ? product.sizes.join(', ') : '',
      colors: product.colors ? product.colors.join(', ') : '',
      description: product.description || ''
    });
    setShowProductForm(true);
  };

  if (isAdmin === null) {
    return (
      <div className="admin-loading">
        <div className="loading-content">
          <h1>🎀 Verifying Admin Access...</h1>
          <p>Please wait a moment.</p>
        </div>
      </div>
    );
  }

  if (isAdmin === false) {
    return (
      <div className="admin-denied">
        <div className="denied-content">
          <h1>🚫 Access Denied</h1>
          <p>You do not have permission to view this page. Redirecting you home...</p>
          <button onClick={() => navigate('/')} className="btn btn-primary">Go Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <div className="admin-nav">
          <button
            className={`admin-tab ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            📦 Products ({products.length})
          </button>
          <button
            className={`admin-tab ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            🛒 Orders ({orders.length})
          </button>
        </div>
      </div>

      <div className="admin-content">
        {/* PRODUCTS TAB */}
        {activeTab === 'products' && (
          <div className="admin-section">
            <div className="section-header">
              <h2>Product Management</h2>
              <button
                className="add-btn"
                onClick={() => {
                  setFormData({
                    id: '',
                    name: '',
                    price: '',
                    category: 'coquette',
                    image: '',
                    sizes: [],
                    colors: [],
                    description: ''
                  });
                  setShowProductForm(!showProductForm);
                }}
              >
                {showProductForm ? '✕ Cancel' : '+ Add New Product'}
              </button>
            </div>

            {showProductForm && (
              <div className="form-container">
                <h3>{formData.id ? 'Edit Product' : 'Add New Product'}</h3>
                <form onSubmit={handleAddProduct} className="admin-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Product Name *</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g., Velvet Mini Dress"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Price (₱) *</label>
                      <input
                        type="number"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        placeholder="299.99"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Category</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      >
                        <option value="coquette">Coquette</option>
                        <option value="y2k">Y2K</option>
                        <option value="fairycore">Fairycore</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Image URL</label>
                      <input
                        type="text"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Sizes (comma-separated)</label>
                      <input
                        type="text"
                        value={formData.sizes}
                        onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
                        placeholder="XS, S, M, L, XL"
                      />
                    </div>
                    <div className="form-group">
                      <label>Colors (comma-separated)</label>
                      <input
                        type="text"
                        value={formData.colors}
                        onChange={(e) => setFormData({ ...formData, colors: e.target.value })}
                        placeholder="Blush, White, Black"
                      />
                    </div>
                  </div>

                  <div className="form-group full">
                    <label>Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Product description..."
                      rows="4"
                    />
                  </div>

                  <button type="submit" className="submit-btn">
                    {formData.id ? '💾 Update Product' : '➕ Add Product'}
                  </button>
                </form>
              </div>
            )}

            <div className="products-grid">
              {products.length === 0 ? (
                <p className="empty-state">No products yet. Add your first product!</p>
              ) : (
                products.map((product) => (
                  <div key={product.id} className="product-card">
                    <img src={product.image} alt={product.name} />
                    <div className="product-info">
                      <h4>{product.name}</h4>
                      <p className="price">₱{product.price.toFixed(2)}</p>
                      <p className="category">{product.category}</p>
                      <div className="product-actions">
                        <button
                          className="edit-btn"
                          onClick={() => handleEditProduct(product)}
                        >
                          ✏️ Edit
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ORDERS TAB */}
        {activeTab === 'orders' && (
          <div className="admin-section">
            <h2>Order Management & Shipping Confirmation</h2>
            <div className="orders-container">
              {orders.length === 0 ? (
                <p className="empty-state">No orders yet.</p>
              ) : (
                orders.map((order) => (
                  <div key={order.id} className="order-card">
                    <div className="order-header">
                      <h3>Order #{order.id}</h3>
                      <span className={`status-badge ${order.status}`}>
                        {order.status?.toUpperCase() || 'PENDING'}
                      </span>
                    </div>

                    <div className="order-details">
                      <div className="detail-group">
                        <h4>Customer Information</h4>
                        <p><strong>Name:</strong> {order.shipping_info?.firstName} {order.shipping_info?.lastName}</p>
                        <p><strong>Email:</strong> {order.shipping_info?.email}</p>
                        <p><strong>Phone:</strong> {order.shipping_info?.phone}</p>
                      </div>

                      <div className="detail-group">
                        <h4>Shipping Address</h4>
                        <p>{order.shipping_info?.address}</p>
                        <p>{order.shipping_info?.city}, {order.shipping_info?.state} {order.shipping_info?.zipCode}</p>
                      </div>

                      <div className="detail-group">
                        <h4>Order Items</h4>
                        {order.items && order.items.length > 0 ? (
                          <ul>
                            {order.items.map((item, idx) => (
                              <li key={idx}>
                                {item.name} - Qty: {item.quantity}, Size: {item.size}, Color: {item.color}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p>No items found</p>
                        )}
                      </div>

                      <div className="detail-group">
                        <h4>Order Summary</h4>
                        <p><strong>Subtotal:</strong> ₱{order.subtotal?.toFixed(2) || '0.00'}</p>
                        <p><strong>Tax:</strong> ₱{order.tax?.toFixed(2) || '0.00'}</p>
                        <p><strong>Shipping:</strong> ₱{order.shipping?.toFixed(2) || '0.00'}</p>
                        <p className="total"><strong>Total:</strong> ₱{order.total?.toFixed(2) || '0.00'}</p>
                      </div>

                      <div className="detail-group">
                        <h4>Order Date</h4>
                        <p>{new Date(order.created_at).toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="status-actions">
                      <label>Update Status:</label>
                      <div className="status-buttons">
                        {['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => (
                          <button
                            key={status}
                            className={`status-btn ${order.status === status ? 'active' : ''}`}
                            onClick={() => handleUpdateOrderStatus(order.id || order.order_id, status)}
                          >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="order-actions" style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #eaeaea', display: 'flex', justifyContent: 'flex-end' }}>
                      <button
                        className="delete-btn"
                        onClick={() => handleDeleteOrder(order.id || order.order_id)}
                        style={{ background: '#ff3366', color: 'white', padding: '8px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
                      >
                        🗑️ Delete Order
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
