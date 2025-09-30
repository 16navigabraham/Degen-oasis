'use client';

import { Quote } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import ReactionButtons from './reaction-buttons';
import { Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface DailyQuoteCardProps {
  quote: Quote;
}

export default function DailyQuoteCard({ quote }: DailyQuoteCardProps) {
  return (
    <Card className="w-full shadow-lg shadow-primary/10">
      <CardHeader>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span className='font-headline text-gradient'>Quote of the Day</span>
            <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{format(new Date(quote.date), "MMMM d, yyyy")}</span>
            </div>
        </div>
      </CardHeader>
      <CardContent className="py-6">
        <blockquote className="text-center">
          <p className="font-headline text-2xl md:text-3xl font-medium text-foreground">
            “{quote.text}”
          </p>
          {quote.author && (
            <footer className="mt-4 text-base text-muted-foreground">
              — {quote.author}
            </footer>
          )}
        </blockquote>
      </CardContent>
      <CardFooter>
        <ReactionButtons quote={quote} />
      </CardFooter>
    </Card>
  );
}
