'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { getCountdown } from '@/lib/utils';
import { Timer } from 'lucide-react';
import { PolarAngleAxis, RadialBar, RadialBarChart, ResponsiveContainer } from 'recharts';

const TOTAL_SECONDS_IN_DAY = 24 * 60 * 60;

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ hours: '00', minutes: '00', seconds: '00' });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const countdown = getCountdown();
      setTimeLeft(countdown);

      const hours = parseInt(countdown.hours, 10);
      const minutes = parseInt(countdown.minutes, 10);
      const seconds = parseInt(countdown.seconds, 10);
      const secondsRemaining = hours * 3600 + minutes * 60 + seconds;
      
      setProgress(100 - (secondsRemaining / TOTAL_SECONDS_IN_DAY) * 100);

    }, 1000);

    // Set initial value
    const countdown = getCountdown();
    setTimeLeft(countdown);
    const hours = parseInt(countdown.hours, 10);
    const minutes = parseInt(countdown.minutes, 10);
    const seconds = parseInt(countdown.seconds, 10);
    const secondsRemaining = hours * 3600 + minutes * 60 + seconds;
    setProgress(100 - (secondsRemaining / TOTAL_SECONDS_IN_DAY) * 100);

    return () => clearInterval(timer);
  }, []);

  const chartData = [{ name: 'progress', value: progress, fill: 'hsl(var(--primary))' }];

  return (
    <Card className="bg-transparent border-primary/20 backdrop-blur-none">
      <CardContent className="p-4 relative aspect-square">
        <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
                innerRadius="80%"
                outerRadius="90%"
                data={chartData}
                startAngle={90}
                endAngle={-270}
                barSize={10}
            >
                <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                <RadialBar background dataKey="value" cornerRadius={5} />
            </RadialBarChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center">
            <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                <Timer className='h-4 w-4'/>
                <span>Next quote in</span>
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
