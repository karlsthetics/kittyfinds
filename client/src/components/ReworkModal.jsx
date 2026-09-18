// ReworkModal.jsx – displays a clicked rework sample in a fullscreen overlay
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ReworkModal({ isOpen, onClose, imageSrc, index }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="modal-content"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={e => e.stopPropagation()}
          >
            <img src={imageSrc} alt={`Rework ${index + 1}`} className="modal-image" />
            <button className="modal-close" onClick={onClose}>×</button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
