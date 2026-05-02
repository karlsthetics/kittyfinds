// ============================================================================
// KITTY'S FINDS - Main App Component
// Router setup and page handling
// EDIT: Add more routes/pages as needed
// ============================================================================

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import About from './pages/About';
import Contact from './pages/Contact';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Admin from './pages/Admin';
import { supabase } from './utils/supabaseClient';
import { createCart } from './utils/api';
import './styles/global.css';

function App() {
  // Track shopping cart ID in localStorage for persistence
  const [cartId, setCartId] = useState(() => {
    const savedCartId = localStorage.getItem('cartId');
    return savedCartId || null;
  });

  // User authentication state management
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Auth state listener
  useEffect(() => {
    if (!supabase) return; // Skip if Supabase is not configured

    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        const userData = {
          id: session.user.id,
          email: session.user.email,
          name: session.user.user_metadata?.full_name || session.user.email.split('@')[0],
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
      }
    });

    // Listen for changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        const userData = {
          id: session.user.id,
          email: session.user.email,
          name: session.user.user_metadata?.full_name || session.user.email.split('@')[0],
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
      } else {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('userToken');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Initialize cart on app load if needed
  useEffect(() => {
    const initializeCart = async () => {
      const savedCartId = localStorage.getItem('cartId');
      if (!savedCartId) {
        try {
          const newCartId = await createCart();
          setCartId(newCartId);
          localStorage.setItem('cartId', newCartId);
        } catch (err) {
          console.error('Error initializing cart:', err);
          // Try again after a delay
          setTimeout(async () => {
            try {
              const newCartId = await createCart();
              setCartId(newCartId);
              localStorage.setItem('cartId', newCartId);
            } catch (err2) {
              console.error('Cart initialization retry failed:', err2);
            }
          }, 1000);
        }
      }
    };

    initializeCart();
  }, []);

  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'transparent' }}>
        {/* Header component visible on all pages */}
        <Header cartId={cartId} user={user} setUser={setUser} />

        {/* Main content area with routing */}
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home cartId={cartId} setCartId={setCartId} />} />
            <Route path="/shop" element={<Shop cartId={cartId} setCartId={setCartId} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product/:id" element={<ProductDetail cartId={cartId} setCartId={setCartId} user={user} />} />
            <Route path="/cart" element={<Cart cartId={cartId} setCartId={setCartId} />} />
            <Route path="/checkout" element={<Checkout cartId={cartId} setCartId={setCartId} />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>

        {/* Footer component visible on all pages */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
