// ============================================================================
// LOGIN Page Component
// User authentication for shopping and order tracking
// EDIT: Integrate with real authentication (JWT, OAuth, etc.)
// ============================================================================

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';
import './styles/Login.css';

function Login({ setUser }) {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form states for login/signup
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  });

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  // Handle LOGIN submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!formData.email || !formData.password) {
        setError('Please fill in all fields');
        return;
      }

      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (authError) throw authError;

      // Update app state - user will be caught by auth listener in App.js
      alert('✅ Welcome back!');
      navigate('/');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  // Handle SIGNUP submission
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
        setError('Please fill in all fields');
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      const { data, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.name,
          }
        }
      });

      if (authError) throw authError;

      // Profile will be created by auth listener/hook in App.js or handled here
      alert('✅ Check your email for verification link!');
      navigate('/');
    } catch (err) {
      setError(err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Logo */}
        <Link to="/" className="login-logo">
          <h1>🎀 Kitty's Finds</h1>
        </Link>

        {/* Auth Card */}
        <div className="auth-card">
          {/* Tabs */}
          <div className="auth-tabs">
            <button
              className={`tab ${isLogin ? 'active' : ''}`}
              onClick={() => {
                setIsLogin(true);
                setError('');
              }}
            >
              Login
            </button>
            <button
              className={`tab ${!isLogin ? 'active' : ''}`}
              onClick={() => {
                setIsLogin(false);
                setError('');
              }}
            >
              Sign Up
            </button>
          </div>

          {/* Error Message */}
          {error && <div className="error-banner">{error}</div>}

          {/* LOGIN FORM */}
          {isLogin ? (
            <form onSubmit={handleLogin} className="auth-form">
              <h2>Welcome Back! 💕</h2>

              <div className="form-group">
                <label htmlFor="login-email">Email</label>
                <input
                  type="email"
                  id="login-email"
                  name="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="login-password">Password</label>
                <input
                  type="password"
                  id="login-password"
                  name="password"
                  placeholder="Your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary auth-button"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>

              <div className="auth-footer">
                <a href="#forgot">Forgot password?</a>
              </div>
            </form>
          ) : (
            /* SIGNUP FORM */
            <form onSubmit={handleSignup} className="auth-form">
              <h2>Join Kitty's Finds! ✨</h2>

              <div className="form-group">
                <label htmlFor="signup-name">Full Name</label>
                <input
                  type="text"
                  id="signup-name"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="signup-email">Email</label>
                <input
                  type="email"
                  id="signup-email"
                  name="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="signup-password">Password</label>
                <input
                  type="password"
                  id="signup-password"
                  name="password"
                  placeholder="At least 6 characters"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="signup-confirm">Confirm Password</label>
                <input
                  type="password"
                  id="signup-confirm"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary auth-button"
                disabled={loading}
              >
                {loading ? 'Creating account...' : 'Create Account'}
              </button>

              <div className="auth-footer">
                <p>By signing up, you agree to our Terms of Service</p>
              </div>
            </form>
          )}

          {/* Continue as Guest */}
          <div className="guest-option">
            <p>or</p>
            <Link to="/" className="guest-link">
              Continue as Guest
            </Link>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="login-decorations">
          <span className="decoration">🌸</span>
          <span className="decoration">💕</span>
          <span className="decoration">✨</span>
        </div>
      </div>
    </div>
  );
}

export default Login;
