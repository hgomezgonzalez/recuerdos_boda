'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface RouletteLeverProps {
  onPull: () => void;
  disabled?: boolean;
}

export const RouletteLever: React.FC<RouletteLeverProps> = ({ onPull, disabled = false }) => {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      whileHover={disabled ? {} : { scale: 1.1 }}
      whileTap={disabled ? {} : { scale: 0.9, rotate: -5 }}
      onClick={onPull}
      disabled={disabled}
      className={`
        relative bg-gradient-to-br from-wedding-ochre to-wedding-ochre-light
        text-wedding-ivory font-playfair font-bold text-2xl md:text-3xl
        px-12 py-6 rounded-full shadow-2xl
        transition-all duration-300
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-wedding-ochre/50 hover:shadow-2xl'}
        flex items-center gap-4
      `}
    >
      <span className="text-4xl animate-bounce-slow">🎰</span>
      <span>¡Baja la palanca!</span>
      <span className="text-4xl animate-bounce-slow" style={{ animationDelay: '0.2s' }}>🎰</span>
      
      {/* Decorative elements */}
      <motion.div
        className="absolute inset-0 rounded-full border-4 border-wedding-ochre-light opacity-0"
        animate={disabled ? {} : {
          opacity: [0, 0.5, 0],
          scale: [1, 1.2, 1.4],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "loop",
        }}
      />
    </motion.button>
  );
};
