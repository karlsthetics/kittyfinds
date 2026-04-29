// ============================================================================
// HEADER Component
// Navigation bar with logo, menu, and cart icon
// EDIT: Add more navigation links or user menu as needed
// ============================================================================

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchCart } from '../utils/api';
import './styles/Header.css';

function Header({ cartId, user, setUser }) {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Fetch cart count whenever cartId changes or periodically
  useEffect(() => {
    const updateCartCount = () => {
      if (cartId) {
        fetchCart(cartId)
          .then(cart => {
            const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
            setCartCount(totalItems);
          })
          .catch(err => console.error('Error fetching cart:', err));
      }
    };

    // Initial fetch
    updateCartCount();

    // Set up an interval to check cart every second for real-time updates
    const interval = setInterval(updateCartCount, 1000);

    return () => clearInterval(interval);
  }, [cartId]);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsMenuOpen(false);
    navigate('/');
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <Link to="/" className="logo">
            <h1>Kitty's Finds 🎀</h1>
            <p className="logo-tagline">Your Aesthetic Boutique</p>
          </Link>

          {/* Mobile menu toggle */}
          <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
            <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}></span>
          </button>

          {/* Navigation menu */}
          <nav className={`nav ${isMenuOpen ? 'active' : ''}`}>
            <Link to="/shop" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              Shop
            </Link>
            <Link to="/about" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              About
            </Link>
            <Link to="/contact" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              Contact
            </Link>

            {/* Cart Button - aligned with nav */}
            <Link to="/cart" className="nav-link cart-link">
              Cart {cartCount > 0 && <span className="cart-count">({cartCount})</span>}
            </Link>
          </nav>

          {/* User section - separate spacing */}
          <div className="user-section">
            {!user ? (
              <Link to="/login" className="login-btn" onClick={() => setIsMenuOpen(false)}>
                Login
              </Link>
            ) : (
              <>
                <span className="user-welcome">Welcome, {user.name}!</span>
                {user.email === 'karl.alegrado@urios.edu.ph' && (
                  <Link to="/admin" className="admin-btn" onClick={() => setIsMenuOpen(false)}>
                    👨‍💼 Admin
                  </Link>
                )}
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
