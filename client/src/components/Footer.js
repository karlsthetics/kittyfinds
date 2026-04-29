// ============================================================================
// FOOTER Component
// Footer with social links and information
// EDIT: Update contact info, social links, and policies
// ============================================================================

import React from 'react';
import './styles/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* About Section */}
          <div className="footer-section">
            <h3>About Kitty's Finds</h3>
            <p>
              Ribbons, lace & all things dreamy — your one-stop destination for coquette, Y2K & fairycore fashion. 
              Curated pieces for girls who dream in pink. 🎀
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="/">Shop</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#shipping">Shipping Info</a></li>
              <li><a href="#returns">Returns</a></li>
            </ul>
          </div>

          {/* Social Links - EDIT: Update with your actual social media */}
          <div className="footer-section">
            <h3>Follow Us</h3>
            <div className="social-links">
              <a href="https://www.instagram.com/kittykeyn/" target="_blank" rel="noopener noreferrer">📱 Instagram</a>
              <a href="https://www.tiktok.com/@kittyfinds444" target="_blank" rel="noopener noreferrer">🎵 TikTok</a>
              <a href="https://www.facebook.com/profile.php?id=61571478706126" target="_blank" rel="noopener noreferrer">📌 Facebook</a>
            </div>
          </div>

          {/* Contact */}
          <div className="footer-section">
            <h3>Contact Us</h3>
            <p>Email: carehew@gmail.com</p>
            <p>Phone: 0921 405 7325</p>
            <p>Hours: Mon-Sun 12:00am - 11:00pm</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>&copy; 2026 Kitty's Finds. All rights reserved. 🎀✨</p>
          <div className="footer-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#cookies">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
