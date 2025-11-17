'use client';

import { useEffect, useRef, useCallback } from 'react';

interface AudioOptions {
  loop?: boolean;
  volume?: number;
}

const AUDIO_FILES = {
  lever: '/sounds/lever.mp3',
  spin: '/sounds/spin.mp3',
  win: '/sounds/win.mp3',
  confetti: '/sounds/confetti.mp3',
} as const;

type AudioName = keyof typeof AUDIO_FILES;

export const useAudioPlayer = () => {
  const audioRefs = useRef<Map<string, HTMLAudioElement>>(new Map());
  const isInitialized = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined' || isInitialized.current) return;
    
    // Preload all audio files
    Object.entries(AUDIO_FILES).forEach(([name, path]) => {
      const audio = new Audio(path);
      audio.preload = 'auto';
      audioRefs.current.set(name, audio);
    });

    isInitialized.current = true;

    // Cleanup
    return () => {
      audioRefs.current.forEach((audio) => {
        audio.pause();
        audio.src = '';
      });
      audioRefs.current.clear();
      isInitialized.current = false;
    };
  }, []);

  const play = useCallback((name: AudioName, options: AudioOptions = {}) => {
    const audio = audioRefs.current.get(name);
    if (!audio) {
      console.warn(`Audio file "${name}" not found`);
      return;
    }

    try {
      // Reset the audio
      audio.currentTime = 0;
      audio.loop = options.loop || false;
      audio.volume = options.volume !== undefined ? options.volume : 0.5;

      // Play with error handling for autoplay policies
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn(`Failed to play audio "${name}":`, error);
        });
      }
    } catch (error) {
      console.warn(`Error playing audio "${name}":`, error);
    }
  }, []);

  const stop = useCallback((name: AudioName) => {
    const audio = audioRefs.current.get(name);
    if (!audio) return;

    try {
      audio.pause();
      audio.currentTime = 0;
      audio.loop = false;
    } catch (error) {
      console.warn(`Error stopping audio "${name}":`, error);
    }
  }, []);

  const stopAll = useCallback(() => {
    audioRefs.current.forEach((audio, name) => {
      try {
        audio.pause();
        audio.currentTime = 0;
        audio.loop = false;
      } catch (error) {
        console.warn(`Error stopping audio "${name}":`, error);
      }
    });
  }, []);

  return { play, stop, stopAll };
};
