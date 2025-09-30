/**
 * In a real-world application, this would be a database like Firestore or a PostgreSQL database.
 * For this demo, we are using in-memory objects that reset on server restart.
 */
import type { Quote, UserActions, Reaction } from './types';

let quotes: Quote[] = [
    {
        id: 1,
        text: 'The greatest risk is not taking one.',
        author: 'Satoshi Nakamoto',
        date: '2024-07-18',
        reactions: { '🔥': 42, '🚀': 1337, '💎': 69, '🌕': 88 },
        reactedWallets: {},
    },
    {
        id: 2,
        text: 'To the moon!',
        author: 'Every Degen Ever',
        date: '2024-07-17',
        reactions: { '🔥': 12, '🚀': 50, '💎': 5, '🌕': 200 },
        reactedWallets: {},
    }
];

let userActions: UserActions = {};

const getTodayDateString = () => new Date().toISOString().split('T')[0];

export const getTodaysQuote = (): Quote | undefined => {
  const today = getTodayDateString();
  return quotes.find(q => q.date === today);
};

export const getQuoteHistory = (): Quote[] => {
  const today = getTodayDateString();
  return quotes.filter(q => q.date !== today).sort((a, b) => b.id - a.id);
};

export const addQuote = (text: string, author: string | null, walletAddress: string): Quote => {
  const today = getTodayDateString();
  
  const newQuote: Quote = {
    id: quotes.length + 1,
    text,
    author,
    date: today,
    reactions: { '🔥': 0, '🚀': 0, '💎': 0, '🌕': 0 },
    reactedWallets: {},
  };
  quotes.unshift(newQuote);

  if (!userActions[walletAddress]) {
    userActions[walletAddress] = {};
  }
  userActions[walletAddress].lastQuoteSubmissionDate = today;

  return newQuote;
};

export const addReaction = (quoteId: number, reaction: Reaction, walletAddress: string): Quote | undefined => {
  const today = getTodayDateString();
  const quote = quotes.find(q => q.id === quoteId);

  if (!quote) return undefined;
  
  // Allow reaction only on today's quote
  if(quote.date !== today) return undefined;

  // if user already reacted, remove old reaction
  const oldReaction = quote.reactedWallets[walletAddress];
  if (oldReaction) {
    quote.reactions[oldReaction] = Math.max(0, quote.reactions[oldReaction] - 1);
  }

  quote.reactions[reaction]++;
  quote.reactedWallets[walletAddress] = reaction;
  
  if (!userActions[walletAddress]) {
    userActions[walletAddress] = {};
  }
  userActions[walletAddress].lastReactionDate = today;

  return quote;
}

export const canSubmitQuote = (walletAddress: string): boolean => {
    const today = getTodayDateString();
    const lastSubmission = userActions[walletAddress]?.lastQuoteSubmissionDate;
    return lastSubmission !== today;
}

export const canReactToQuote = (walletAddress: string): boolean => {
    const today = getTodayDateString();
    const lastReaction = userActions[walletAddress]?.lastReactionDate;
    return lastReaction !== today;
}

export const getUserReactionForToday = (walletAddress: string): Reaction | undefined => {
  const today = getTodaysQuote();
  if (!today || !walletAddress) return undefined;
  return today.reactedWallets[walletAddress];
}
