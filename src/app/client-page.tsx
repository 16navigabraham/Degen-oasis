'use client';

import { useWallet } from '@/context/wallet-context';
import { Quote } from '@/lib/types';
import QuoteSubmissionForm from '@/components/quote/quote-submission-form';
import DailyQuoteCard from '@/components/quote/daily-quote-card';
import QuoteHistory from '@/components/quote/quote-history';
import CountdownTimer from '@/components/quote/countdown-timer';
import { Card, CardContent } from '@/components/ui/card';
import { canSubmitQuote } from '@/lib/data';
import { useEffect, useState } from 'react';
import { Feather } from 'lucide-react';

interface ClientPageProps {
  serverTodaysQuote: Quote | undefined;
  serverQuoteHistory: Quote[];
}

export default function ClientPage({
  serverTodaysQuote,
  serverQuoteHistory,
}: ClientPageProps) {
  const { isConnected, walletAddress } = useWallet();
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);

  useEffect(() => {
    if (!isConnected || !walletAddress) {
      setShowSubmissionForm(false);
      return;
    }
    // We need to re-check this on the client because `canSubmitQuote` relies on
    // state that is mutated by server actions.
    const userCanSubmit = canSubmitQuote(walletAddress);
    setShowSubmissionForm(!serverTodaysQuote && userCanSubmit);

  }, [isConnected, walletAddress, serverTodaysQuote]);


  return (
    <div className="container py-8">
      <div className="mx-auto grid max-w-3xl gap-8">
        
        {serverTodaysQuote ? (
          <DailyQuoteCard quote={serverTodaysQuote} />
        ) : isConnected && showSubmissionForm ? (
          <QuoteSubmissionForm />
        ) : (
          <Card className="bg-card/50 border-dashed">
            <CardContent className="p-8 flex flex-col items-center justify-center text-center gap-4">
              <div className="p-4 bg-primary/10 rounded-full border border-primary/20">
                <Feather className="h-12 w-12 text-primary" strokeWidth={1.5} />
              </div>
              <div className='space-y-1'>
                <h3 className='font-headline text-xl text-primary'>Awaiting Today's Wisdom</h3>
                <p className="text-center text-muted-foreground">
                  {isConnected ? "Be the first to share a quote for today." : "Connect your wallet to submit today's quote."}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {serverTodaysQuote && <CountdownTimer />}

        <QuoteHistory quotes={serverQuoteHistory} />
      </div>
    </div>
  );
}
