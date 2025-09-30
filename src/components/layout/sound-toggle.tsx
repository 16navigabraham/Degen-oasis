'use client';

import * as React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useSound } from '@/context/sound-context';
import { Button } from '@/components/ui/button';

export default function SoundToggle() {
  const { isSoundEnabled, toggleSound } = useSound();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleSound}
      aria-label="Toggle sound"
    >
      {isSoundEnabled ? (
        <Volume2 className="h-[1.2rem] w-[1.2rem]" />
      ) : (
        <VolumeX className="h-[1.2rem] w-[1.2rem]" />
      )}
      <span className="sr-only">Toggle sound</span>
    </Button>
  );
}
