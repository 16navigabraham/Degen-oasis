'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';

// A simple map of sound types to their audio properties
const soundMap = {
    click: { freq: 440, type: 'sine', duration: 0.1 },
    connect: { freq: 523.25, type: 'sine', duration: 0.2 },
    disconnect: { freq: 349.23, type: 'sine', duration: 0.2 },
    reaction: { freq: 659.25, type: 'triangle', duration: 0.15 },
    submit: { freq: 783.99, type: 'square', duration: 0.2 },
    error: { freq: 220, type: 'sawtooth', duration: 0.3 },
};

type SoundType = keyof typeof soundMap;

interface SoundContextType {
  isSoundEnabled: boolean;
  toggleSound: () => void;
  playSound: (sound: SoundType) => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

let audioContext: AudioContext | null = null;

const initializeAudioContext = () => {
    if (typeof window !== 'undefined' && !audioContext) {
        audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
};

export const SoundProvider = ({ children }: { children: ReactNode }) => {
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);

  useEffect(() => {
    // On mount, check for user preference in localStorage
    const savedPreference = localStorage.getItem('sound-enabled');
    if (savedPreference !== null) {
      setIsSoundEnabled(JSON.parse(savedPreference));
    }
    // Ensure AudioContext is available. It needs a user interaction to start.
    initializeAudioContext();
  }, []);


  const playSound = useCallback((sound: SoundType) => {
    if (!isSoundEnabled || !audioContext) return;
    
    const soundProps = soundMap[sound];
    if (!soundProps) return;

    try {
        // Create an oscillator
        const oscillator = audioContext.createOscillator();
        // Create a gain node to control volume
        const gainNode = audioContext.createGain();

        // Connect oscillator to gain, and gain to destination (speakers)
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        // Configure oscillator
        oscillator.type = soundProps.type as OscillatorType;
        oscillator.frequency.setValueAtTime(soundProps.freq, audioContext.currentTime);

        // Configure gain (volume envelope) to prevent harsh clicks
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.01); // Quick fade in
        gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + soundProps.duration); // Fade out

        // Start and stop the oscillator
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + soundProps.duration);
    } catch (error) {
        console.error("Error playing sound:", error);
    }
  }, [isSoundEnabled]);

  const toggleSound = () => {
    // Resume AudioContext on the first user interaction
    if (audioContext?.state === 'suspended') {
      audioContext.resume();
    }
    const newSoundState = !isSoundEnabled;
    setIsSoundEnabled(newSoundState);
    localStorage.setItem('sound-enabled', JSON.stringify(newSoundState));
    if (newSoundState) {
        playSound('click');
    }
  };
  
  return (
    <SoundContext.Provider
      value={{
        isSoundEnabled,
        toggleSound,
        playSound,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  const context = useContext(SoundContext);
  if (context === undefined) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
};
