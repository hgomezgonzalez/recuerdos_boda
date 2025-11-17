'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Participant } from '@/types';

interface RouletteSpinnerProps {
  participants: Participant[];
  duration: number; // in seconds
  onComplete: (winner: Participant) => void;
}

export const RouletteSpinner: React.FC<RouletteSpinnerProps> = ({ 
  participants, 
  duration, 
  onComplete 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [speed, setSpeed] = useState(50); // Initial speed in ms
  const [isSpinning, setIsSpinning] = useState(true);
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    if (!isSpinning || participants.length === 0) return;

    const startTime = Date.now();
    const endTime = startTime + (duration * 1000);
    
    const spinInterval = setInterval(() => {
      const now = Date.now();
      const elapsed = (now - startTime) / 1000;
      setTimeElapsed(elapsed);
      
      // Calculate easing - slow down as we approach the end
      const progress = Math.min(elapsed / duration, 1);
      const easing = 1 - Math.pow(1 - progress, 3); // Cubic easing out
      
      // Speed ranges from 50ms to 500ms
      const newSpeed = 50 + (450 * easing);
      setSpeed(newSpeed);
      
      if (now >= endTime) {
        // Time's up! Select winner
        clearInterval(spinInterval);
        setIsSpinning(false);
        const winnerIndex = Math.floor(Math.random() * participants.length);
        setCurrentIndex(winnerIndex);
        setTimeout(() => {
          onComplete(participants[winnerIndex]);
        }, 1000);
      } else {
        // Continue spinning
        setCurrentIndex((prev) => (prev + 1) % participants.length);
      }
    }, speed);

    return () => clearInterval(spinInterval);
  }, [speed, isSpinning, participants, duration, onComplete]);

  if (participants.length === 0) return null;

  const current = participants[currentIndex];
  const prevIndex = (currentIndex - 1 + participants.length) % participants.length;
  const nextIndex = (currentIndex + 1) % participants.length;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-wedding-blue to-wedding-blue-dark p-8">
      <div className="text-center mb-12">
        <motion.h2 
          className="font-playfair text-5xl md:text-6xl text-wedding-ochre mb-4"
          animate={{ opacity: [1, 0.7, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          ¡Girando la ruleta!
        </motion.h2>
        <div className="font-poppins text-wedding-ivory text-xl">
          {Math.max(0, Math.ceil(duration - timeElapsed))} segundos restantes...
        </div>
      </div>

      <div className="relative w-full max-w-4xl h-96 flex items-center justify-center">
        {/* Previous participant (faded) */}
        <motion.div 
          className="absolute left-0 opacity-30 scale-75"
          key={`prev-${prevIndex}`}
        >
          <ParticipantCard participant={participants[prevIndex]} />
        </motion.div>

        {/* Current participant (centered) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`current-${currentIndex}`}
            initial={{ y: -50, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.8 }}
            transition={{ duration: speed / 1000 }}
            className="z-10"
          >
            <ParticipantCard participant={current} isMain />
          </motion.div>
        </AnimatePresence>

        {/* Next participant (faded) */}
        <motion.div 
          className="absolute right-0 opacity-30 scale-75"
          key={`next-${nextIndex}`}
        >
          <ParticipantCard participant={participants[nextIndex]} />
        </motion.div>

        {/* Spinning indicator */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-80 h-80 border-8 border-wedding-ochre/20 border-t-wedding-ochre rounded-full"
            />
          </div>
        </div>
      </div>

      {!isSpinning && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="font-playfair text-3xl text-wedding-ochre">
            ¡Tenemos un ganador!
          </p>
        </motion.div>
      )}
    </div>
  );
};

interface ParticipantCardProps {
  participant: Participant;
  isMain?: boolean;
}

const ParticipantCard: React.FC<ParticipantCardProps> = ({ participant, isMain = false }) => {
  return (
    <div className={`bg-wedding-ivory rounded-2xl overflow-hidden shadow-2xl ${isMain ? 'w-80' : 'w-64'}`}>
      <div className="aspect-square relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={participant.imageURL}
          alt={participant.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(participant.name)}&background=CFA15A&color=F7F3EB&size=400`;
          }}
        />
      </div>
      <div className="p-6">
        <h3 className={`font-playfair text-wedding-blue text-center ${isMain ? 'text-3xl' : 'text-2xl'}`}>
          {participant.name}
        </h3>
      </div>
    </div>
  );
};
