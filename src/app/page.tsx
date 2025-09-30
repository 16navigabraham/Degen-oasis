import { getTodaysQuote, getQuoteHistory } from '@/lib/data';
import ClientPage from './client-page';
import Header from '@/components/layout/header';
import { Suspense } from 'react';

export default async function Home() {
  const todaysQuote = getTodaysQuote();
  const quoteHistory = getQuoteHistory();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Suspense fallback={<p>Loading...</p>}>
          <ClientPage serverTodaysQuote={todaysQuote} serverQuoteHistory={quoteHistory} />
        </Suspense>
      </main>
    </div>
  );
}
