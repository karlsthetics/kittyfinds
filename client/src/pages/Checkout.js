// ============================================================================
// CHECKOUT Page Component
// Customer information and order confirmation
// EDIT: Integrate real payment processor (Stripe, PayPal, etc.)
// ============================================================================

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCart, createOrder } from '../utils/api';
import './styles/Checkout.css';

function Checkout({ cartId, setCartId }) {
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState(null);

  // Form states
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    paymentMethod: 'gcash',
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    agreeTerms: false,
  });

  const [errors, setErrors] = useState({});

  // Fetch cart on mount
  useEffect(() => {
    if (cartId) {
      fetchCart(cartId)
        .then(data => {
          setCart(data);
        })
        .catch(err => {
          console.error('Error fetching cart:', err);
          navigate('/cart');
        })
        .finally(() => setLoading(false));
    } else {
      navigate('/');
    }
  }, [cartId, navigate]);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  // Validate form - EDIT: Add more robust validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
    if (!formData.cardName.trim()) newErrors.cardName = 'Name on card is required';
    if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
    if (!formData.expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required';
    if (!formData.cvv.trim()) newErrors.cvv = 'CVV is required';
    if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to terms';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      alert('Please fill in all required fields');
      return;
    }

    setSubmitting(true);

    try {
      // Create order with structured data
      const order = await createOrder(cartId, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country
      });

      setOrderId(order.orderId);
      setOrderPlaced(true);
    } catch (err) {
      alert('Error placing order: ' + err.message);
      console.error('Error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="checkout-loading">Loading checkout...</div>;
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="checkout-error">
        <p>Your cart is empty</p>
        <button className="btn btn-primary" onClick={() => navigate('/')}>
          Back to Shop
        </button>
      </div>
    );
  }

  // Order Success Screen
  if (orderPlaced) {
    return (
      <div className="checkout-page">
        <div className="container">
          <div className="order-success">
            <div className="success-icon">✓</div>
            <h1>Order Placed Successfully!</h1>
            <p className="order-number">Order ID: {orderId}</p>
            <p className="success-message">
              Thank you for your order! A confirmation email has been sent to {formData.email}
            </p>
            <div className="order-details">
              <h2>Order Summary</h2>
              <p>Subtotal: ₱{cart.subtotal.toFixed(2)}</p>
              <p>Tax: ₱{cart.tax.toFixed(2)}</p>
              <p className="total">Total: ₱{cart.total.toFixed(2)}</p>
            </div>
            <button className="btn btn-primary" onClick={() => navigate('/')}>
              Back to Shop
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <h1 className="checkout-title">Checkout</h1>

        <div className="checkout-content">
          {/* Checkout Form */}
          <form className="checkout-form" onSubmit={handleSubmit}>
            {/* Shipping Information */}
            <div className="form-section">
              <h2 className="section-title">Shipping Information</h2>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name *</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={errors.firstName ? 'error' : ''}
                    required
                  />
                  {errors.firstName && <span className="error-text">{errors.firstName}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">Last Name *</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={errors.lastName ? 'error' : ''}
                    required
                  />
                  {errors.lastName && <span className="error-text">{errors.lastName}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={errors.email ? 'error' : ''}
                    required
                  />
                  {errors.email && <span className="error-text">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={errors.phone ? 'error' : ''}
                    required
                  />
                  {errors.phone && <span className="error-text">{errors.phone}</span>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="address">Address *</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className={errors.address ? 'error' : ''}
                  required
                />
                {errors.address && <span className="error-text">{errors.address}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">City *</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={errors.city ? 'error' : ''}
                    required
                  />
                  {errors.city && <span className="error-text">{errors.city}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="state">State *</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className={errors.state ? 'error' : ''}
                    required
                  />
                  {errors.state && <span className="error-text">{errors.state}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="zipCode">ZIP Code *</label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className={errors.zipCode ? 'error' : ''}
                    required
                  />
                  {errors.zipCode && <span className="error-text">{errors.zipCode}</span>}
                </div>
              </div>
            </div>

            {/* Payment Information - EDIT: Replace with real payment gateway */}
            <div className="form-section">
              <h2 className="section-title">Payment Method</h2>
              <p className="payment-notice">
                ⚠️ Demo mode - Select your preferred payment method
              </p>

              <div className="form-group payment-methods">
                <label>Select Payment Method *</label>
                <div className="payment-options">
                  <div className="payment-option">
                    <input
                      type="radio"
                      id="gcash"
                      name="paymentMethod"
                      value="gcash"
                      checked={formData.paymentMethod === 'gcash'}
                      onChange={handleInputChange}
                      required
                    />
                    <label htmlFor="gcash" className="payment-label">
                      <span className="payment-icon">📱</span>
                      <span className="payment-name">GCash</span>
                    </label>
                  </div>

                  <div className="payment-option">
                    <input
                      type="radio"
                      id="bank"
                      name="paymentMethod"
                      value="bank_transfer"
                      checked={formData.paymentMethod === 'bank_transfer'}
                      onChange={handleInputChange}
                      required
                    />
                    <label htmlFor="bank" className="payment-label">
                      <span className="payment-icon">🏦</span>
                      <span className="payment-name">Bank Transfer</span>
                    </label>
                  </div>
                </div>
                {errors.paymentMethod && <span className="error-text">{errors.paymentMethod}</span>}
              </div>

              {/* Card details - only show if card payment selected (for compatibility) */}
              <div className="form-group">
                <label htmlFor="cardName">Name on Card *</label>
                <input
                  type="text"
                  id="cardName"
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleInputChange}
                  className={errors.cardName ? 'error' : ''}
                  required
                />
                {errors.cardName && <span className="error-text">{errors.cardName}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="cardNumber">Card Number *</label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  className={errors.cardNumber ? 'error' : ''}
                  required
                />
                {errors.cardNumber && <span className="error-text">{errors.cardNumber}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="expiryDate">Expiry Date (MM/YY) *</label>
                  <input
                    type="text"
                    id="expiryDate"
                    name="expiryDate"
                    placeholder="MM/YY"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    className={errors.expiryDate ? 'error' : ''}
                    required
                  />
                  {errors.expiryDate && <span className="error-text">{errors.expiryDate}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="cvv">CVV *</label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    placeholder="123"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    className={errors.cvv ? 'error' : ''}
                    required
                  />
                  {errors.cvv && <span className="error-text">{errors.cvv}</span>}
                </div>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="form-section">
              <div className="form-group checkbox">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor="agreeTerms">
                  I agree to the Terms of Service and Privacy Policy *
                </label>
                {errors.agreeTerms && <span className="error-text">{errors.agreeTerms}</span>}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`btn btn-primary submit-btn ${submitting ? 'disabled' : ''}`}
              disabled={submitting}
            >
              {submitting ? 'Processing...' : `Complete Order - ₱${cart.total.toFixed(2)}`}
            </button>
          </form>

          {/* Order Summary Sidebar */}
          <div className="order-summary">
            <h2>Order Summary</h2>

            {/* Items */}
            <div className="summary-items">
              {cart.items.map((item, index) => (
                <div key={index} className="summary-item-row">
                  <span>{item.name} x {item.quantity}</span>
                  <span>₱{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="summary-divider"></div>

            {/* Totals */}
            <div className="summary-total-row">
              <span>Subtotal:</span>
              <span>₱{cart.subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-total-row">
              <span>Tax:</span>
              <span>₱{cart.tax.toFixed(2)}</span>
            </div>
            <div className="summary-total-row final">
              <span>Total:</span>
              <span>₱{cart.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
