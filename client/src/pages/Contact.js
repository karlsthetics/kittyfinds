// ============================================================================
// CONTACT Page
// Contact form and information
// ============================================================================

import React, { useState } from 'react';
import './styles/Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <h1>Get in Touch 💌</h1>
        <p>We'd love to hear from you! Send us a message and we'll respond as soon as possible.</p>
      </div>

      <div className="contact-container">
        <div className="contact-content">
          <section className="contact-info">
            <h2>Contact Information</h2>
            
            <div className="info-block">
              <h3>📧 Email</h3>
              <p>support@kittysfinds.com</p>
              <p className="sub-text">We respond within 24 hours</p>
            </div>

            <div className="info-block">
              <h3>📱 Social Media</h3>
              <p>Follow us on Instagram, TikTok, and Facebook for exclusive drops and styling tips!</p>
              <div className="social-links">
                <button>Instagram</button>
                <button>TikTok</button>
                <button>Facebook</button>
              </div>
            </div>

            <div className="info-block">
              <h3>⏰ Business Hours</h3>
              <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p>Saturday - Sunday: 10:00 AM - 4:00 PM</p>
            </div>

            <div className="info-block">
              <h3>📦 Shipping & Returns</h3>
              <p>For questions about shipping or returns, check out our Shipping & Returns page or contact us!</p>
            </div>
          </section>

          <section className="contact-form-section">
            <h2>Send us a Message</h2>
            {submitted && (
              <div className="success-message">
                ✨ Thank you for your message! We'll get back to you soon. 💌
              </div>
            )}
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="What is this about?"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Tell us what's on your mind..."
                  rows="5"
                ></textarea>
              </div>

              <button type="submit" className="submit-btn">Send Message 💌</button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Contact;
