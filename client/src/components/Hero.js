// ============================================================================
// HERO Component
// Large banner section at top of home page
// EDIT: Change hero text, image, and call-to-action button
// ============================================================================

import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Hero.css';

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        {/* Main Heading - EDIT: Change tagline as needed */}
        <div className="hero-text">
          <h1 className="hero-title">Your Coquette Era Awaits 🎀</h1>
          <p className="hero-subtitle">
            Coquette · Y2K · Fairycore
          </p>
          <p className="hero-description">
            Ribbons, lace & all things dreamy — discover our curated aesthetic collections.
            Handpicked pieces for girls who dream in pink. ✨
          </p>
          
          {/* Call-to-Action Button */}
          <Link to="/" className="hero-button">
            Explore Collections →
          </Link>
        </div>

        {/* Hero Image - EDIT: Change image URL */}
        <div className="hero-image">
          <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
            {/* Decorative SVG Elements */}
            
            {/* Flower 1 */}
            <circle cx="100" cy="100" r="15" fill="#ff69b4" opacity="0.3"/>
            <circle cx="100" cy="70" r="8" fill="#ff1493"/>
            <circle cx="100" cy="130" r="8" fill="#ff1493"/>
            <circle cx="70" cy="100" r="8" fill="#ff1493"/>
            <circle cx="130" cy="100" r="8" fill="#ff1493"/>
            <circle cx="85" cy="85" r="8" fill="#ff1493"/>
            <circle cx="115" cy="115" r="8" fill="#ff1493"/>

            {/* Flower 2 */}
            <circle cx="300" cy="80" r="12" fill="#e6b3f0" opacity="0.3"/>
            <circle cx="300" cy="60" r="6" fill="#da70d6"/>
            <circle cx="300" cy="100" r="6" fill="#da70d6"/>
            <circle cx="280" cy="80" r="6" fill="#da70d6"/>
            <circle cx="320" cy="80" r="6" fill="#da70d6"/>

            {/* Butterfly */}
            <ellipse cx="200" cy="50" rx="8" ry="15" fill="#ffd700" transform="rotate(-30 200 50)"/>
            <ellipse cx="200" cy="50" rx="8" ry="15" fill="#ffd700" transform="rotate(30 200 50)"/>
            <circle cx="200" cy="50" r="3" fill="#ff69b4"/>

            {/* Stars */}
            <circle cx="50" cy="150" r="3" fill="#ff69b4" opacity="0.5"/>
            <circle cx="350" cy="200" r="3" fill="#e6b3f0" opacity="0.5"/>
            <circle cx="120" cy="300" r="2" fill="#ffd700" opacity="0.5"/>
            <circle cx="320" cy="320" r="2" fill="#ff1493" opacity="0.5"/>

            {/* Heart shapes - decorative */}
            <path d="M 200 150 Q 195 140 185 145 Q 180 155 200 170 Q 220 155 215 145 Q 205 140 200 150" 
                  fill="#ff69b4" opacity="0.3"/>
            <path d="M 150 250 Q 145 240 135 245 Q 130 255 150 270 Q 170 255 165 245 Q 155 240 150 250" 
                  fill="#e6b3f0" opacity="0.3"/>
          </svg>
        </div>
      </div>

      {/* Features Section - EDIT: Add or remove features */}
      <div className="hero-features">
        <div className="feature">
          <span className="feature-icon">🚚</span>
          <h4>Fast Shipping</h4>
          <p>Ships within 1-2 business days</p>
        </div>
        <div className="feature">
          <span className="feature-icon">🎀</span>
          <h4>Premium Quality</h4>
          <p>Carefully curated collections</p>
        </div>
        <div className="feature">
          <span className="feature-icon">💕</span>
          <h4>100% Satisfaction</h4>
          <p>Easy returns & exchanges</p>
        </div>
        <div className="feature">
          <span className="feature-icon">🌟</span>
          <h4>Exclusive Items</h4>
          <p>Limited edition pieces</p>
        </div>
      </div>
    </section>
  );
}

export default Hero;
