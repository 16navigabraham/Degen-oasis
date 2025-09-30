'use client';

import { useWallet } from '@/context/wallet-context';
import { Quote } from '@/lib/types';
import QuoteSubmissionForm from '@/components/quote/quote-submission-form';
import DailyQuoteCard from '@/components/quote/daily-quote-card';
import QuoteHistory from '@/components/quote/quote-history';
import CountdownTimer from '@/components/quote/countdown-timer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { canSubmitQuote } from '@/lib/data';
import { useEffect, useState } from 'react';

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
            <CardHeader>
              <CardTitle className="font-headline text-center text-primary">Awaiting Today's Wisdom</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground">
                {isConnected ? "A new quote can be submitted for today." : "Connect your wallet to submit today's quote."}
              </p>
            </CardContent>
          </Card>
        )}

        {serverTodaysQuote && <CountdownTimer />}

        <QuoteHistory quotes={serverQuoteHistory} />
      </div>
    </div>
  );
}
