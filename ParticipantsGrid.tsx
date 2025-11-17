'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Participant } from '@/types';

interface ParticipantsGridProps {
  participants: Participant[];
}

export const ParticipantsGrid: React.FC<ParticipantsGridProps> = ({ participants }) => {
  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h2 className="font-playfair text-4xl text-wedding-ochre mb-2">
          Participantes en juego
        </h2>
        <p className="font-poppins text-wedding-ivory text-lg">
          Restantes: {participants.length}
        </p>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4 px-4 md:px-8"
      >
        {participants.map((participant, index) => (
          <motion.div
            key={`${participant.name}-${index}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.02, duration: 0.3 }}
            whileHover={{ scale: 1.1, zIndex: 10 }}
            className="relative group"
          >
            <div className="bg-wedding-ivory rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="aspect-square relative overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={participant.imageURL}
                  alt={participant.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(participant.name)}&background=CFA15A&color=F7F3EB&size=200`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-wedding-blue/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-2">
                <p className="font-poppins text-xs text-wedding-blue text-center truncate">
                  {participant.name}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
