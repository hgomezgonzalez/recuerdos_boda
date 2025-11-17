'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Participant, AppState } from '@/types';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import { UploadList } from '@/components/UploadList';
import { ParticipantsGrid } from '@/components/ParticipantsGrid';
import { RouletteLever } from '@/components/RouletteLever';
import { RouletteSpinner } from '@/components/RouletteSpinner';
import { WinnerDisplay } from '@/components/WinnerDisplay';
import { FinishedScreen } from '@/components/FinishedScreen';

export default function Home() {
  const [appState, setAppState] = useState<AppState>('upload');
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [currentWinner, setCurrentWinner] = useState<Participant | null>(null);
  const { play, stop, stopAll } = useAudioPlayer();

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && appState === 'grid' && participants.length > 0) {
        handleLeverPull();
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [appState, participants]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleParticipantsLoaded = useCallback((loadedParticipants: Participant[]) => {
    setParticipants(loadedParticipants);
    setAppState('grid');
    setCurrentWinner(null);
  }, []);

  const handleLeverPull = useCallback(() => {
    if (participants.length === 0) return;
    
    // Play lever sound
    play('lever');
    
    // Start spinning after a short delay
    setTimeout(() => {
      setAppState('spinning');
      play('spin', { loop: true, volume: 0.3 });
    }, 500);
  }, [participants, play]);

  const handleSpinComplete = useCallback((winner: Participant) => {
    stop('spin');
    play('win');
    play('confetti', { volume: 0.2 });
    setCurrentWinner(winner);
    setAppState('winner');
  }, [play, stop]);

  const handleWinnerComplete = useCallback(() => {
    if (!currentWinner) return;
    
    // Remove winner from participants
    setParticipants(prev => prev.filter(p => p.name !== currentWinner.name));
    
    // Check if there are more participants
    if (participants.length <= 1) {
      setAppState('finished');
    } else {
      setAppState('grid');
    }
    
    setCurrentWinner(null);
  }, [currentWinner, participants]);

  const handleReset = useCallback(() => {
    stopAll();
    setParticipants([]);
    setCurrentWinner(null);
    setAppState('upload');
  }, [stopAll]);

  // Check for empty participants list
  useEffect(() => {
    if (appState === 'grid' && participants.length === 0) {
      setAppState('finished');
    }
  }, [appState, participants]);

  return (
    <main className="min-h-screen no-select">
      <AnimatePresence mode="wait">
        {appState === 'upload' && (
          <UploadList 
            key="upload"
            onParticipantsLoaded={handleParticipantsLoaded} 
          />
        )}
        
        {appState === 'grid' && (
          <div key="grid" className="min-h-screen bg-gradient-to-br from-wedding-blue to-wedding-blue-dark py-8">
            <div className="container mx-auto">
              <div className="text-center mb-8">
                <h1 className="font-playfair text-5xl md:text-6xl text-wedding-ochre mb-2">
                  Ruleta de Recuerdos
                </h1>
                <p className="font-playfair text-2xl text-wedding-ivory">
                  H 💍 R
                </p>
              </div>
              
              <ParticipantsGrid participants={participants} />
              
              <div className="flex justify-center mt-12 pb-8">
                <RouletteLever 
                  onPull={handleLeverPull}
                  disabled={participants.length === 0}
                />
              </div>
              
              <div className="text-center mt-4">
                <p className="font-poppins text-wedding-ivory/60 text-sm">
                  Presiona ENTER o haz clic en la palanca para girar
                </p>
              </div>
            </div>
          </div>
        )}
        
        {appState === 'spinning' && (
          <RouletteSpinner
            key="spinning"
            participants={participants}
            duration={15}
            onComplete={handleSpinComplete}
          />
        )}
        
        {appState === 'winner' && currentWinner && (
          <WinnerDisplay
            key="winner"
            winner={currentWinner}
            onComplete={handleWinnerComplete}
          />
        )}
        
        {appState === 'finished' && (
          <FinishedScreen
            key="finished"
            onReset={handleReset}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
