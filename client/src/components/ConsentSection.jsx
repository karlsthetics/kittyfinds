import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import './styles/ConsentSection.css';

const ConsentSection = ({ onPaymentComplete, customerData, orderTotal }) => {
  const [consents, setConsents] = useState({
    payment: false,
    privacy: false,
    marketing: false,
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSending, setIsSending] = useState(false);

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setConsents(prev => ({ ...prev, [name]: checked }));
    if (status.type === 'error') setStatus({ type: '', message: '' });
  };

  const handlePay = async (e) => {
    e.preventDefault();
    
    if (!consents.payment || !consents.privacy) {
      setStatus({ 
        type: 'error', 
        message: 'Please agree to the required terms to continue, lovely! 🌸' 
      });
      return;
    }

    setIsSending(true);
    setStatus({ type: '', message: '' });

    try {
      // Configuration for EmailJS
      // Note: User needs to set these up in their EmailJS dashboard
      const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID || 'service_default';
      const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'template_order_confirm';
      const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'your_public_key';

      const templateParams = {
        to_name: `${customerData?.firstName || 'Valued Customer'}`,
        to_email: customerData?.email,
        order_total: orderTotal || '0.00',
        message: 'Your order has been received and is being processed with love! 🎀'
      };

      if (publicKey !== 'your_public_key') {
        await emailjs.send(serviceId, templateId, templateParams, publicKey);
      } else {
        console.warn('EmailJS not configured. Skipping email send.');
      }

      setStatus({ 
        type: 'success', 
        message: "You're all set! A confirmation has been sent to your email ✨" 
      });
      
      // Notify parent component that payment/consent is done
      if (onPaymentComplete) {
        setTimeout(() => onPaymentComplete(), 2000);
      }

    } catch (error) {
      console.error('Email Error:', error);
      setStatus({ 
        type: 'error', 
        message: 'Oh no! Something went wrong. Please try again, dear. 🎀' 
      });
    } finally {
      setIsSending(false);
    }
  };

  const isFormValid = consents.payment && consents.privacy;

  return (
    <div className="consent-container">
      <h3 className="consent-title">
        <span>🎀</span> Finalize Your Order
      </h3>

      {status.message && (
        <div className={`${status.type}-banner`}>
          {status.message}
        </div>
      )}

      <div className="consent-group">
        {/* Payment Authorization */}
        <label className={`consent-item ${status.type === 'error' && !consents.payment ? 'error' : ''}`}>
          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              name="payment"
              checked={consents.payment}
              onChange={handleCheckboxChange}
            />
            <div className="checkbox-custom"></div>
          </div>
          <span className="consent-text">
            I authorize the payment for this order and understand it is final.
            <span className="badge badge-required">Required</span>
          </span>
        </label>

        {/* Privacy Policy */}
        <label className={`consent-item ${status.type === 'error' && !consents.privacy ? 'error' : ''}`}>
          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              name="privacy"
              checked={consents.privacy}
              onChange={handleCheckboxChange}
            />
            <div className="checkbox-custom"></div>
          </div>
          <span className="consent-text">
            I agree to the Privacy Policy and terms of service.
            <span className="badge badge-required">Required</span>
          </span>
        </label>

        {/* Email Updates */}
        <label className="consent-item">
          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              name="marketing"
              checked={consents.marketing}
              onChange={handleCheckboxChange}
            />
            <div className="checkbox-custom"></div>
          </div>
          <span className="consent-text">
            Send me ethereal updates and secret discounts via email!
            <span className="badge badge-optional">Optional</span>
          </span>
        </label>
      </div>

      <button 
        className="pay-button"
        onClick={handlePay}
        disabled={!isFormValid || isSending}
      >
        {isSending ? 'Sending Love...' : `Confirm & Pay - ₱${orderTotal}`}
        <span>✨</span>
      </button>
    </div>
  );
};

export default ConsentSection;
