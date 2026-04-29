// ============================================================================
// CART Page Component
// Shopping cart with item management and checkout button
// EDIT: Add promo code, gift wrapping, shipping options
// ============================================================================

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchCart, updateCartItem, removeFromCart } from '../utils/api';
import './styles/Cart.css';

function Cart({ cartId, setCartId }) {
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch cart on mount
  useEffect(() => {
    if (cartId) {
      fetchCart(cartId)
        .then(data => {
          setCart(data);
          setError(null);
        })
        .catch(err => {
          setError('Failed to load cart');
          console.error('Error:', err);
        })
        .finally(() => setLoading(false));
    } else {
      setError('No cart found. Please shop from the home page.');
      setLoading(false);
    }
  }, [cartId]);

  // Handle quantity change
  const handleQuantityChange = async (item, newQuantity) => {
    if (newQuantity <= 0) return;

    try {
      await updateCartItem(cartId, item.productId, {
        quantity: newQuantity,
        size: item.size,
        color: item.color,
      });

      // Refresh cart
      const updatedCart = await fetchCart(cartId);
      setCart(updatedCart);
    } catch (err) {
      alert('Error updating cart: ' + err.message);
    }
  };

  // Handle remove item
  const handleRemoveItem = async (item) => {
    try {
      await removeFromCart(cartId, item.productId, item.size, item.color);

      // Refresh cart
      const updatedCart = await fetchCart(cartId);
      setCart(updatedCart);
    } catch (err) {
      alert('Error removing item: ' + err.message);
    }
  };

  // Handle proceed to checkout
  const handleCheckout = () => {
    if (!cart || cart.items.length === 0) {
      alert('Cart is empty');
      return;
    }
    navigate('/checkout');
  };

  if (loading) {
    return <div className="cart-loading">Loading your cart...</div>;
  }

  if (error) {
    return (
      <div className="cart-error">
        <p>{error}</p>
        <Link to="/" className="btn btn-primary">Back to Shop</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1 className="cart-title">🛍️ Shopping Cart</h1>

        <div className="cart-content">
          {/* Cart Items */}
          <div className="cart-items-section">
            {cart && cart.items.length > 0 ? (
              <div className="items-list">
                {cart.items.map((item, index) => (
                  <div key={index} className="cart-item">
                    {/* Item Image */}
                    <div className="item-image-container">
                      <img 
                        src={item.image}
                        alt={item.name}
                        className="item-image"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/120?text=Product';
                        }}
                      />
                    </div>

                    {/* Item Details */}
                    <div className="item-details">
                      <h3 className="item-name">{item.name}</h3>
                      <p className="item-variant">
                        Size: <strong>{item.size}</strong> | Color: <strong>{item.color}</strong>
                      </p>
                      <p className="item-price">₱{item.price.toFixed(2)}</p>
                    </div>

                    {/* Item Controls */}
                    <div className="item-controls">
                      {/* Quantity Selector */}
                      <div className="quantity-selector">
                        <button
                          className="qty-btn"
                          onClick={() => handleQuantityChange(item, item.quantity - 1)}
                        >
                          −
                        </button>
                        <input
                          type="number"
                          min="1"
                          max="99"
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item, parseInt(e.target.value) || 1)}
                          className="qty-input"
                        />
                        <button
                          className="qty-btn"
                          onClick={() => handleQuantityChange(item, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>

                      {/* Item Total */}
                      <div className="item-total">
                        ₱{(item.price * item.quantity).toFixed(2)}
                      </div>

                      {/* Remove Button */}
                      <button
                        className="remove-btn"
                        onClick={() => handleRemoveItem(item)}
                        title="Remove item"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-cart">
                <p>Your cart is empty</p>
                <Link to="/" className="btn btn-primary">Continue Shopping</Link>
              </div>
            )}
          </div>

          {/* Cart Summary */}
          {cart && cart.items.length > 0 && (
            <div className="cart-summary">
              <h2>Order Summary</h2>

              {/* Summary Items */}
              <div className="summary-item">
                <span>Subtotal:</span>
                <span>₱{cart.subtotal.toFixed(2)}</span>
              </div>

              {/* Shipping - EDIT: Add realistic shipping costs */}
              <div className="summary-item">
                <span>Shipping:</span>
                <span className="shipping-free">FREE</span>
              </div>

              {/* Tax */}
              <div className="summary-item">
                <span>Tax (estimated):</span>
                <span>₱{cart.tax.toFixed(2)}</span>
              </div>

              {/* Promo Code - EDIT: Add promo code functionality */}
              <div className="promo-code-section">
                <input
                  type="text"
                  placeholder="Enter promo code"
                  className="promo-input"
                  disabled
                />
                <small className="promo-info">Coming soon: Enter promo code for discounts</small>
              </div>

              {/* Total */}
              <div className="summary-total">
                <span>Total:</span>
                <span>₱{cart.total.toFixed(2)}</span>
              </div>

              {/* Checkout Button */}
              <button className="btn btn-primary checkout-btn" onClick={handleCheckout}>
                Proceed to Checkout →
              </button>

              {/* Continue Shopping */}
              <a href="/" className="continue-shopping">
                ← Continue Shopping
              </a>

              {/* Trust Badges - EDIT: Add real trust signals */}
              <div className="trust-badges">
                <p>✓ Secure Checkout</p>
                <p>✓ SSL Encrypted</p>
                <p>✓ Money-back Guarantee</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
