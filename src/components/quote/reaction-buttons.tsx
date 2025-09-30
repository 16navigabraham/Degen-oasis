'use client';

import { useState, useTransition, useEffect } from 'react';
import { EMOJI_REACTIONS, Quote, Reaction } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/context/wallet-context';
import { cn } from '@/lib/utils';
import { submitReactionAction } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { getUserReactionForToday } from '@/lib/data';
import { useSound } from '@/context/sound-context';

interface ReactionButtonsProps {
  quote: Quote;
}

export default function ReactionButtons({ quote }: ReactionButtonsProps) {
  const { walletAddress, isConnected } = useWallet();
  const { toast } = useToast();
  const { playSound } = useSound();
  const [isPending, startTransition] = useTransition();
  const [optimisticReactions, setOptimisticReactions] = useState(quote.reactions);
  const [optimisticUserReaction, setOptimisticUserReaction] = useState<Reaction | undefined>(undefined);

  useEffect(() => {
    if (walletAddress) {
      setOptimisticUserReaction(getUserReactionForToday(walletAddress));
    } else {
      setOptimisticUserReaction(undefined);
    }
  }, [walletAddress, quote.id]);
  
  useEffect(() => {
    setOptimisticReactions(quote.reactions);
  }, [quote.reactions]);

  const handleReaction = (reaction: Reaction) => {
    if (!isConnected || !walletAddress) {
      toast({
        variant: 'destructive',
        title: 'Wallet not connected',
        description: 'Please connect your wallet to react.',
      });
      playSound('error');
      return;
    }

    playSound('reaction');

    startTransition(async () => {
      const oldOptimisticUserReaction = optimisticUserReaction;
      const oldOptimisticReactions = optimisticReactions;

      setOptimisticReactions(currentReactions => {
        const newReactions = { ...currentReactions };
        // Decrement old reaction if exists
        if (optimisticUserReaction) {
          newReactions[optimisticUserReaction] = Math.max(0, newReactions[optimisticUserReaction] - 1);
        }
        // Increment new reaction
        newReactions[reaction]++;
        return newReactions;
      });
      setOptimisticUserReaction(reaction);

      const result = await submitReactionAction(quote.id, reaction, walletAddress);
      
      if (result.success) {
        toast({
          title: 'Reaction Recorded!',
          description: 'Your reaction has been cast. Come back tomorrow!',
        });
      } else {
        toast({
            variant: 'destructive',
            title: 'Reaction failed',
            description: result.message,
        });
        playSound('error');
        // Revert optimistic update
        setOptimisticReactions(oldOptimisticReactions);
        setOptimisticUserReaction(oldOptimisticUserReaction);
      }
    });
  };

  return (
    <div className="mx-auto flex items-center justify-center gap-2 sm:gap-4">
      {EMOJI_REACTIONS.map((emoji) => {
        const count = optimisticReactions[emoji];
        const hasReactedWithThis = optimisticUserReaction === emoji;

        return (
          <Button
            key={emoji}
            variant="outline"
            size="lg"
            className={cn(
              'group relative overflow-hidden rounded-full transition-all duration-300 ease-out hover:scale-110 hover:border-primary hover:shadow-lg hover:shadow-primary/20 active:scale-95',
              hasReactedWithThis && 'border-primary bg-primary/10 text-primary',
              isPending && 'opacity-50 cursor-not-allowed'
            )}
            onClick={() => handleReaction(emoji)}
            disabled={isPending}
            aria-pressed={hasReactedWithThis}
          >
            <div className="flex items-center gap-2">
              <span className="text-xl transition-transform duration-300 group-hover:scale-125 group-hover:rotate-[-8deg]">{emoji}</span>
              <span className="font-mono text-sm font-medium tabular-nums">{count}</span>
            </div>
          </Button>
        );
      })}
    </div>
  );
}
