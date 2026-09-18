// ============================================================================
// HOME Page – Only Commission Rework Samples (interactive)
// ============================================================================

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ReworkModal from '../components/ReworkModal';
import Hero from '../components/Hero';
import './styles/Home.css';

function Home() {
  const [selectedRework, setSelectedRework] = useState(null);

  // Generate 37 rework items (1.jpg to 37.jpg)
  const reworks = Array.from({ length: 37 }, (_, i) => {
    return {
      id: i + 1,
      title: `Rework ${i + 1}`,
      desc: "A beautifully hand-reworked piece, transformed with care and aesthetic vision.",
      image: `/images/${i + 1}.jpg`
    };
  });

  const openModal = (index) => {
    setSelectedRework(index);
  };

  const closeModal = () => {
    setSelectedRework(null);
  };

  return (
    <div className="home-page">
      <Hero />
      <motion.section
        className="reworks-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="section-header text-center">
          <h2 className="section-title">Commission Rework Samples</h2>
          <p className="section-description mx-auto">
            See samples from our custom rework services — transforming pieces just for you.
          </p>
        </div>
        <div className="reworks-grid">
          {reworks.map((rework, i) => (
            <motion.div
              key={rework.id}
              className="rework-panel"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              whileHover={{ y: -10, boxShadow: "0 15px 35px rgba(255, 105, 180, 0.2)" }}
              onClick={() => openModal(i)}
            >
              <div className="rework-image-placeholder">
                <img
                  src={rework.image}
                  alt={rework.title}
                  className="rework-image"
                />
                <div className="rework-overlay">
                  <span className="rework-overlay-btn">View Details ✨</span>
                </div>
              </div>
              <div className="rework-info">
                <h3>{rework.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <ReworkModal
        isOpen={selectedRework !== null}
        onClose={closeModal}
        imageSrc={selectedRework !== null ? reworks[selectedRework].image : ''}
        index={selectedRework ?? 0}
      />
    </div>
  );
}

export default Home;
