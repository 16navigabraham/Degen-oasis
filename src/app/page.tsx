import { getTodaysQuote, getQuoteHistory } from '@/lib/data';
import ClientPage from './client-page';
import Header from '@/components/layout/header';
import { Suspense } from 'react';
import { DailyQuoteSkeleton, QuoteHistorySkeleton } from '@/components/quote/quote-skeletons';

function PageSkeleton() {
  return (
    <div className="container py-8">
      <div className="mx-auto grid max-w-3xl gap-8">
        <DailyQuoteSkeleton />
        <QuoteHistorySkeleton />
      </div>
    </div>
  )
}

export default async function Home() {
  const todaysQuote = getTodaysQuote();
  const quoteHistory = getQuoteHistory();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Suspense fallback={<PageSkeleton />}>
          <ClientPage serverTodaysQuote={todaysQuote} serverQuoteHistory={quoteHistory} />
        </Suspense>
      </main>
    </div>
  );
}
