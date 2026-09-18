// ============================================================================
// HEADER Component — MetaMask-Inspired Frosted Glass Nav
// ============================================================================

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { fetchCart } from '../utils/api';
import './styles/Header.css';

function Header({ cartId, user, setUser }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [cartCount, setCartCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll detection for header shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Fetch cart count
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
    updateCartCount();
    const interval = setInterval(updateCartCount, 1000);
    return () => clearInterval(interval);
  }, [cartId]);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsMenuOpen(false);
    navigate('/');
  };

  const isActive = (path) => location.pathname === path ? 'nav-link active-link' : 'nav-link';

  return (
    <header className={`header${scrolled ? ' scrolled' : ''}`}>
      <div className="container">
        <div className="header-content">

          {/* Logo */}
          <Link to="/" className="logo">
            <h1>Kitty's Finds 🎀</h1>
            <p className="logo-tagline">Your Aesthetic Boutique</p>
          </Link>

          {/* Mobile toggle */}
          <button
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span className="bar" style={{
              transform: isMenuOpen ? 'translateY(7px) rotate(45deg)' : 'none',
            }} />
            <span className="bar" style={{
              opacity: isMenuOpen ? 0 : 1,
              transform: isMenuOpen ? 'scaleX(0)' : 'none',
            }} />
            <span className="bar" style={{
              transform: isMenuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none',
            }} />
          </button>

          {/* Nav links */}
          <nav className={`nav${isMenuOpen ? ' active' : ''}`} role="navigation">
            <Link to="/shop" className={isActive('/shop')} onClick={() => setIsMenuOpen(false)}>
              Shop
            </Link>
            <Link to="/about" className={isActive('/about')} onClick={() => setIsMenuOpen(false)}>
              About
            </Link>
            <Link to="/contact" className={isActive('/contact')} onClick={() => setIsMenuOpen(false)}>
              Contact
            </Link>
          </nav>

          {/* User section (removed for rework bundle) */}
          <div className="user-section">
            {/* Login and Admin removed */}
          </div>

        </div>
      </div>
    </header>
  );
}

export default Header;
