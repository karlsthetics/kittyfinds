// ============================================================================
// ABOUT Page
// Information about Kitty's Finds
// ============================================================================

import React from 'react';
import './styles/About.css';

function About() {
  return (
    <div className="about-page">
      <div className="about-hero">
        <h1>About Kitty's Finds 🎀</h1>
        <p>Your Aesthetic Boutique</p>
      </div>

      <div className="about-container">
        <section className="about-section">
          <h2>Our Story</h2>
          <p>
            Kitty's Finds was born from a passion for fashion and aesthetics. We believe that clothing 
            is more than just fabric – it's a form of self-expression and a way to celebrate your unique 
            personality. Whether you're drawn to the romantic elegance of coquette fashion, the nostalgic 
            vibes of Y2K, or the enchanted beauty of fairycore, we have something special for you.
          </p>
        </section>

        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            Our mission is to make aesthetic fashion accessible to everyone. We curate our collections 
            with care, ensuring every piece represents quality, style, and authenticity. We want you to 
            feel confident, beautiful, and true to yourself in every item you wear.
          </p>
        </section>

        <section className="about-section">
          <h2>Our Collections</h2>
          <div className="collections-info">
            <div className="collection-info-card">
              <h3>🎀 Coquette</h3>
              <p>Embrace femininity with ribbons, lace, and romantic details. Our coquette collection 
              celebrates elegance, delicacy, and timeless beauty.</p>
            </div>
            <div className="collection-info-card">
              <h3>✨ Y2K</h3>
              <p>Relive the early 2000s with our Y2K collection. Butterfly clips, holographic finishes, 
              and nostalgic trends come together for ultimate retro vibes.</p>
            </div>
            <div className="collection-info-card">
              <h3>🌸 Fairycore</h3>
              <p>Step into an enchanted forest with our fairycore collection. Flowing fabrics, nature-inspired 
              details, and magical aesthetics create a dreamy wardrobe.</p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>Why Choose Us?</h2>
          <ul className="features-list">
            <li>✨ Curated pieces by style experts</li>
            <li>💎 Premium quality materials</li>
            <li>🚚 Free shipping on orders over ₱75</li>
            <li>🎀 Easy 30-day returns</li>
            <li>💌 Exclusive drops and early access for subscribers</li>
            <li>🌟 Fast, friendly customer service</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>Get in Touch</h2>
          <p>Have questions? We'd love to hear from you! Contact us through our contact page or 
          reach out via our social media channels. We're here to help make your shopping experience 
          absolutely magical.</p>
        </section>
      </div>
    </div>
  );
}

export default About;
