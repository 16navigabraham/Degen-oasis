import { Quote } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { format, parseISO } from 'date-fns';
import CategoryTag from './category-tag';
import { History, MoreHorizontal } from 'lucide-react';
import { QuoteDetailModal } from './quote-detail-modal';
import { Button } from '../ui/button';

interface QuoteHistoryProps {
  quotes: Quote[];
}

export default function QuoteHistory({ quotes }: QuoteHistoryProps) {
  if (quotes.length === 0) {
    return (
      <div className="text-center py-10 px-4 border border-dashed rounded-lg border-border">
        <History className="mx-auto h-10 w-10 text-muted-foreground mb-3" strokeWidth={1.5} />
        <h3 className="font-headline text-lg text-muted-foreground">No History Yet</h3>
        <p className="text-sm text-muted-foreground/80">Quotes from previous days will appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-center font-headline text-2xl font-bold text-primary">
        Wisdom of Ages Past
      </h2>
      <div className="relative space-y-4 after:absolute after:inset-y-0 after:left-4 after:w-0.5 after:bg-border after:animate-in after:fade-in after:duration-1000">
        {quotes.map((quote, index) => (
          <div key={quote.id} className="relative pl-10 animate-in fade-in slide-in-from-left-4 duration-500" style={{ animationDelay: `${index * 100}ms`}}>
            <div className="absolute left-4 top-4 z-10 -translate-x-1/2 rounded-full bg-primary p-1.5">
                <div className='h-2 w-2 rounded-full bg-primary-foreground'></div>
            </div>
            <QuoteDetailModal quote={quote}>
              <Card className="border-border transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 cursor-pointer">
                <CardHeader className="pb-3 flex-row items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                        {format(parseISO(quote.date), 'MMMM d, yyyy')}
                    </p>
                    {quote.category && <CategoryTag category={quote.category} className='mt-2' />}
                  </div>
                  <Button variant='ghost' size='icon' className='h-8 w-8 -my-2 -mr-2 text-muted-foreground hover:text-foreground'>
                    <MoreHorizontal className='h-5 w-5' />
                  </Button>
                </CardHeader>
                <CardContent>
                  <blockquote className="space-y-2">
                    <p className="text-foreground line-clamp-3">“{quote.text}”</p>
                    {quote.author && (
                      <footer className="text-sm text-muted-foreground">— {quote.author}</footer>
                    )}
                  </blockquote>
                </CardContent>
              </Card>
            </QuoteDetailModal>
          </div>
        ))}
      </div>
    </div>
  );
}
