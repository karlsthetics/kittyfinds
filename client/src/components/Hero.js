// ============================================================================
// HERO Component — MetaMask-Inspired Full-Viewport Bold Hero with Framer Motion
// ============================================================================

import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';
import './styles/Hero.css';

function Hero() {
  const heroRef = useRef(null);

  // Mouse tracking for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for cursor tracking
  const springConfig = { damping: 30, stiffness: 150 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (rect) {
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    }
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Parallax transform helpers - must be called at the top level
  const b1X = useTransform(smoothMouseX, [-0.5, 0.5], [-50, 50]);
  const b1Y = useTransform(smoothMouseY, [-0.5, 0.5], [-50, 50]);

  const b2X = useTransform(smoothMouseX, [-0.5, 0.5], [-30, 30]);
  const b2Y = useTransform(smoothMouseY, [-0.5, 0.5], [-30, 30]);

  const b3X = useTransform(smoothMouseX, [-0.5, 0.5], [40, -40]);
  const b3Y = useTransform(smoothMouseY, [-0.5, 0.5], [40, -40]);

  const b4X = useTransform(smoothMouseX, [-0.5, 0.5], [20, -20]);
  const b4Y = useTransform(smoothMouseY, [-0.5, 0.5], [20, -20]);

  const r1X = useTransform(smoothMouseX, [-0.5, 0.5], [-80, 80]);
  const r1Y = useTransform(smoothMouseY, [-0.5, 0.5], [-80, 80]);

  const r2X = useTransform(smoothMouseX, [-0.5, 0.5], [60, -60]);
  const r2Y = useTransform(smoothMouseY, [-0.5, 0.5], [60, -60]);

  return (
    <section 
      className="hero" 
      ref={heroRef} 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >



      {/* Floating decorative rings */}
      <motion.div className="hero-ring hero-ring-1" aria-hidden="true" style={{ x: r1X, y: r1Y }} />
      <motion.div className="hero-ring hero-ring-2" aria-hidden="true" style={{ x: r2X, y: r2Y }} />

      {/* Content */}
      <div className="hero-inner container">
        
        {/* Entrance Animation Wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.1 }}
        >
          {/* Eyebrow label */}
          <motion.div className="hero-eyebrow" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <span className="hero-badge">✨ New Collection</span>
            <span className="hero-badge-divider">·</span>
            <span className="hero-badge hero-badge-outline">Free Shipping Over ₱999</span>
          </motion.div>

          {/* Main heading with interactive letters */}
          <motion.h1 
            className="hero-title"
            variants={{
              initial: {},
              animate: { transition: { staggerChildren: 0.03, delayChildren: 0.2 } }
            }}
            initial="initial"
            animate="animate"
            style={{ cursor: 'default', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', animation: 'none' }}
          >
            {"Commission ".split("").map((char, index) => (
              <motion.span
                key={index}
                variants={{
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 }
                }}
                style={{ display: 'inline-block', whiteSpace: char === " " ? "pre" : "normal" }}
                whileHover={{ y: -15, color: "#d4efdf", scale: 1.2 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {char}
              </motion.span>
            ))}
            
            <motion.span className="hero-title-accent" style={{ display: 'flex' }}>
              {"Rework ".split("").map((char, index) => (
                <motion.span
                  key={index}
                  variants={{
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0 }
                  }}
                  style={{ display: 'inline-block', whiteSpace: char === " " ? "pre" : "normal" }}
                  whileHover={{ y: -15, color: "#d4efdf", scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.span>

            <br className="hero-br" />
            
            {"Bundle ".split("").map((char, index) => (
              <motion.span
                key={index}
                variants={{
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 }
                }}
                style={{ display: 'inline-block', whiteSpace: char === " " ? "pre" : "normal" }}
                whileHover={{ y: -15, color: "#d4efdf", scale: 1.2 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {char}
              </motion.span>
            ))}
            
            <motion.span
              variants={{
                initial: { opacity: 0, scale: 0 },
                animate: { opacity: 1, scale: 1 }
              }}
              style={{ display: 'inline-block', marginLeft: '10px' }}
              whileHover={{ scale: 1.3, rotate: [0, -10, 10, 0] }}
            >
              <span role="img" aria-label="bow">🎀</span>
            </motion.span>
          </motion.h1>

        </motion.div>
      </div>

    </section>
  );
}

export default Hero;

