// src/components/quote/quote-detail-modal.tsx
'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Quote, EMOJI_REACTIONS, Reaction } from '@/lib/types';
import { Copy, Twitter, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ReactNode } from 'react';
import CategoryTag from './category-tag';
import { Progress } from '../ui/progress';

interface QuoteDetailModalProps {
  quote: Quote;
  children: ReactNode;
}

export function QuoteDetailModal({ quote, children }: QuoteDetailModalProps) {
  const { toast } = useToast();

  const totalReactions = Object.values(quote.reactions).reduce((sum, count) => sum + count, 0);

  const copyToClipboard = () => {
    const quoteText = `“${quote.text}” — ${quote.author || 'Anonymous'}`;
    navigator.clipboard.writeText(quoteText);
    toast({
      description: 'Quote copied to clipboard!',
    });
  };

  const shareOnTwitter = () => {
    const quoteText = `“${quote.text}” — ${quote.author || 'Anonymous'}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      quoteText
    )}&via=DegenOasis`;
    window.open(twitterUrl, '_blank');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="font-headline text-primary">Quote Details</span>
            <DialogClose asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <X className="h-4 w-4" />
              </Button>
            </DialogClose>
          </DialogTitle>
        </DialogHeader>

        <div className="py-4 space-y-6">
          {quote.category && <CategoryTag category={quote.category} />}
          <blockquote className="space-y-4">
            <p className="text-xl font-medium text-foreground">“{quote.text}”</p>
            {quote.author && (
              <footer className="text-base text-muted-foreground">— {quote.author}</footer>
            )}
          </blockquote>
          
          <div className='space-y-4'>
            <h4 className='font-medium text-sm text-foreground'>Reactions</h4>
            <div className="space-y-3">
              {EMOJI_REACTIONS.map((emoji) => {
                const count = quote.reactions[emoji];
                const percentage = totalReactions > 0 ? (count / totalReactions) * 100 : 0;
                return (
                  <div key={emoji} className="flex items-center gap-3">
                    <span className="text-lg">{emoji}</span>
                    <div className="flex-1 space-y-1">
                      <Progress value={percentage} className="h-2" />
                    </div>
                    <span className="w-12 text-right font-mono text-sm tabular-nums text-muted-foreground">
                      {Math.round(percentage)}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <DialogFooter className="sm:justify-start gap-2">
          <Button variant="outline" onClick={shareOnTwitter}>
            <Twitter className="mr-2" />
            Share
          </Button>
          <Button variant="outline" onClick={copyToClipboard}>
            <Copy className="mr-2" />
            Copy
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
