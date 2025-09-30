'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { getCountdown } from '@/lib/utils';
import { Timer } from 'lucide-react';

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ hours: '00', minutes: '00', seconds: '00' });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getCountdown());
    }, 1000);

    // Set initial value
    setTimeLeft(getCountdown());

    return () => clearInterval(timer);
  }, []);

  return (
    <Card className="bg-transparent border-primary/20 backdrop-blur-none">
      <CardContent className="p-4">
        <div className="flex flex-col items-center justify-center gap-2 text-center">
            <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                <Timer className='h-4 w-4'/>
                <span>Next quote submission in</span>
            </div>
            <div className="font-mono text-3xl font-bold text-primary">
                <span>{timeLeft.hours}</span>:
                <span>{timeLeft.minutes}</span>:
                <span>{timeLeft.seconds}</span>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
