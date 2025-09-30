'use client';

import { Quote } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import ReactionButtons from './reaction-buttons';
import { Calendar } from 'lucide-react';
import { format } from 'date-fns';
import CategoryTag from './category-tag';

interface DailyQuoteCardProps {
  quote: Quote;
}

export default function DailyQuoteCard({ quote }: DailyQuoteCardProps) {
  return (
    <div className="[perspective:1000px]">
      <Card className="w-full shadow-lg shadow-primary/10 transition-all duration-300 hover:[transform:rotateX(5deg)_rotateY(-5deg)] hover:shadow-2xl hover:shadow-primary/20">
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
            {quote.category && (
                <div className='mb-4 flex justify-center'>
                    <CategoryTag category={quote.category} />
                </div>
            )}
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
    </div>
  );
}
