// ============================================================================
// PRODUCT CARD Component
// Individual product card displayed in product lists
// EDIT: Add wishlist/favorites functionality
// ============================================================================

import React from 'react';
import { Link } from 'react-router-dom';
import './styles/ProductCard.css';

function ProductCard({ product }) {
  // EDIT: Price display - uses currency from product (₱ for Philippine Peso)
  const currency = product.currency || '₱';
  const formattedPrice = `${currency}${product.price.toLocaleString('en-PH')}`;

  return (
    <Link to={`/product/${product.id}`} className="product-card-link">
      <div className="product-card">
        {/* Product Image */}
        <div className="product-image-container">
          <img 
            src={product.image} 
            alt={product.name}
            className="product-image"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300x400?text=Product+Image';
            }}
          />
          {/* Add to Cart Overlay - EDIT: Add wishlist button */}
          <div className="product-overlay">
            <button className="overlay-button">View Details</button>
          </div>
        </div>

        {/* Product Info */}
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          
          {/* Rating */}
          <div className="product-rating">
            <span className="stars">{'⭐'.repeat(Math.floor(product.rating))}</span>
            <span className="rating-text">({product.reviews})</span>
          </div>

          {/* Price - EDIT: Currency is set in product data */}
          <div className="product-price">
            <span className="price">{formattedPrice}</span>
          </div>

          {/* Color Preview - EDIT: Make clickable to select color */}
          {product.colors && product.colors.length > 0 && (
            <div className="color-preview">
              {product.colors.slice(0, 3).map((color, index) => (
                <div 
                  key={index} 
                  className="color-dot" 
                  title={color}
                  style={{ backgroundColor: getColorCode(color) }}
                ></div>
              ))}
              {product.colors.length > 3 && (
                <span className="color-more">+{product.colors.length - 3}</span>
              )}
            </div>
          )}

          {/* Size Preview */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="size-preview">
              <small>Sizes: {product.sizes.slice(0, 2).join(', ')}{product.sizes.length > 2 ? '+' : ''}</small>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

// Helper function to convert color names to hex codes
// EDIT: Add more colors here as needed
function getColorCode(colorName) {
  const colorMap = {
    'Pink': '#ffc0cb',
    'Rose Pink': '#ff1493',
    'Lavender': '#e6b3f0',
    'Blush': '#ffb6c1',
    'Coral': '#ff7f50',
    'Cream': '#fff8dc',
    'White': '#ffffff',
    'Black': '#000000',
    'Mint': '#98d8c8',
    'Mint Green': '#98d8c8',
    'Sage': '#9dc183',
    'Sage Green': '#9dc183',
    'Moss Green': '#8a9b7b',
    'Forest Green': '#228b22',
    'Ivory': '#fffff0',
    'Gold': '#ffd700',
    'Blue': '#87ceeb',
    'Purple': '#da70d6',
    'Red': '#ff6347',
    'Champagne': '#f7e7ce',
    'Rose Gold': '#b76e79',
    'Rose': '#ff007f',
    'Mauve': '#e0b0ff',
    'Peach': '#ffcc99',
    'Khaki': '#f0e68c',
    'Hot Pink': '#ff1493',
    'Silver': '#c0c0c0',
    'Bronze': '#cd7f32',
    'Iridescent': '#e0ffff',
    'Rainbow': '#ff1493',
    'Dusty Rose': '#c08081',
    'Dusty Blue': '#6c7899',
    'White/Pink': '#ffb6d9',
    'White/Purple': '#d8b4e8',
    'Black/Silver': '#505050',
    'Gold/Green': '#8b7e00',
    'Silver/Mint': '#7fffff',
    'Bronze/Sage': '#9b8b7e',
  };
  return colorMap[colorName] || '#cccccc';
}

export default ProductCard;
