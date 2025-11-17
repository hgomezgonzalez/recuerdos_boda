'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Participant } from '@/types';

interface WinnerDisplayProps {
  winner: Participant;
  onComplete: () => void;
}

export const WinnerDisplay: React.FC<WinnerDisplayProps> = ({ winner, onComplete }) => {
  useEffect(() => {
    // Fire confetti from multiple angles
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#CFA15A', '#0B3C5D', '#F7F3EB', '#E4C280', '#072940'],
    };

    function fire(particleRatio: number, opts: any) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    // Initial burst
    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });

    // Continue confetti for a few seconds
    const interval = setInterval(() => {
      confetti({
        ...defaults,
        particleCount: 50,
        spread: 90,
        startVelocity: 30,
      });
    }, 700);

    // Auto-advance after 5 seconds
    const timer = setTimeout(() => {
      onComplete();
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
      confetti.reset();
    };
  }, [onComplete]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-wedding-blue via-wedding-blue-dark to-wedding-ochre/20 p-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 bg-wedding-ochre/10 rounded-full filter blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-wedding-blue/20 rounded-full filter blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 10,
          duration: 0.8,
        }}
        className="relative z-10"
      >
        {/* Winner Badge */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="font-playfair text-5xl md:text-7xl text-wedding-ochre mb-2">
            ¡Felicidades!
          </h2>
          <p className="font-poppins text-wedding-ivory text-xl">
            ✨ Invitado Destacado ✨
          </p>
        </motion.div>

        {/* Winner Card */}
        <motion.div
          initial={{ rotateY: 90 }}
          animate={{ rotateY: 0 }}
          transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
          className="bg-wedding-ivory rounded-3xl shadow-2xl overflow-hidden max-w-2xl mx-auto"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="md:flex">
            {/* Image Section */}
            <div className="md:w-1/2 p-8 flex items-center justify-center bg-gradient-to-br from-wedding-ochre/10 to-wedding-ochre/5">
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="relative"
              >
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-8 border-wedding-ochre shadow-xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={winner.imageURL}
                    alt={winner.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(winner.name)}&background=CFA15A&color=F7F3EB&size=400`;
                    }}
                  />
                </div>
                {/* Decorative ring */}
                <motion.div
                  className="absolute inset-0 rounded-full border-4 border-wedding-ochre/30"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop",
                  }}
                />
              </motion.div>
            </div>

            {/* Content Section */}
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <h3 className="font-playfair text-4xl md:text-5xl text-wedding-blue mb-6">
                  {winner.name}
                </h3>
                <div className="border-t-2 border-wedding-ochre pt-6">
                  <p className="font-poppins text-wedding-blue/80 text-lg leading-relaxed">
                    {winner.memory}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Auto-advance indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-center mt-8"
        >
          <p className="font-poppins text-wedding-ivory/60 text-sm">
            Continuando en unos segundos...
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};
