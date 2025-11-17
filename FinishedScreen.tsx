'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface FinishedScreenProps {
  onReset: () => void;
}

export const FinishedScreen: React.FC<FinishedScreenProps> = ({ onReset }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-wedding-blue to-wedding-blue-dark p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="max-w-3xl w-full text-center"
      >
        {/* Celebration Icons */}
        <motion.div
          animate={{
            rotate: [0, 10, -10, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="text-8xl mb-8"
        >
          🎉
        </motion.div>

        {/* Main Message */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="font-playfair text-5xl md:text-7xl text-wedding-ochre mb-8"
        >
          Todos los recuerdos han sido celebrados
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="font-poppins text-2xl text-wedding-ivory mb-4"
        >
          Fin del juego
        </motion.p>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="font-poppins text-xl text-wedding-ivory/80 mb-12"
        >
          Gracias por compartir este momento especial
        </motion.p>

        {/* Hearts decoration */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex justify-center gap-4 mb-12"
        >
          <span className="text-4xl text-wedding-ochre">💍</span>
          <span className="text-4xl text-wedding-ochre animate-pulse">❤️</span>
          <span className="text-4xl text-wedding-ochre">💍</span>
        </motion.div>

        {/* Reset Button */}
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onReset}
          className="bg-wedding-ochre hover:bg-wedding-ochre-light text-wedding-ivory font-poppins font-semibold px-10 py-5 rounded-full text-xl shadow-2xl transition-all duration-300 inline-flex items-center gap-3"
        >
          <span className="text-2xl">🔄</span>
          <span>Cargar nueva lista</span>
        </motion.button>

        {/* Decorative elements */}
        <motion.div
          className="absolute top-10 left-10 text-6xl opacity-20"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          🎊
        </motion.div>
        <motion.div
          className="absolute top-10 right-10 text-6xl opacity-20"
          animate={{
            y: [0, 20, 0],
            rotate: [0, -10, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          🎈
        </motion.div>
        <motion.div
          className="absolute bottom-10 left-10 text-6xl opacity-20"
          animate={{
            y: [0, -15, 0],
            rotate: [0, 15, 0],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          💐
        </motion.div>
        <motion.div
          className="absolute bottom-10 right-10 text-6xl opacity-20"
          animate={{
            y: [0, 15, 0],
            rotate: [0, -15, 0],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          🥂
        </motion.div>
      </motion.div>
    </div>
  );
};
