// ============================================================================
// PRODUCT LIST Component
// Displays products in a grid with filtering options
// EDIT: Add more filter options or sorting capabilities
// ============================================================================

import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { fetchCategories } from '../utils/api';
import './styles/ProductList.css';

function ProductList({ products, loading, showFilters = true }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [categories, setCategories] = useState([]);

  // Fetch available categories on mount
  useEffect(() => {
    fetchCategories()
      .then(cats => setCategories(cats))
      .catch(err => console.error('Error fetching categories:', err));
  }, []);

  // Filter products by selected category
  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

  // Sort products based on selected sort option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
      default:
        return 0;
    }
  });

  return (
    <section className="product-list-section">
      {/* Filters and Sorting - Hide when showFilters is false */}
      {showFilters && (
        <div className="product-controls">
          {/* Category Filter */}
          <div className="filter-group">
            <label htmlFor="category-select" className="filter-label">Category:</label>
            <select
              id="category-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Products</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ')}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Option */}
          <div className="filter-group">
            <label htmlFor="sort-select" className="filter-label">Sort By:</label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

          {/* Results count */}
          <div className="results-count">
            {sortedProducts.length} {sortedProducts.length === 1 ? 'product' : 'products'}
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="loading-container">
          <div className="loading-spinner">Loading products...</div>
        </div>
      )}

      {/* Products Grid */}
      {!loading && sortedProducts.length > 0 ? (
        <div className="products-grid">
          {sortedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        !loading && (
          <div className="no-products">
            <p>No products found. Try a different filter!</p>
          </div>
        )
      )}
    </section>
  );
}

export default ProductList;
