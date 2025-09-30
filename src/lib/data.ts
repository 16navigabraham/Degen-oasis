/**
 * In a real-world application, this would be a database like Firestore or a PostgreSQL database.
 * For this demo, we are using in-memory objects that reset on server restart.
 */
import type { Quote, UserActions, Reaction, Category } from './types';

let quotes: Quote[] = [
    {
        id: 1,
        text: 'The greatest risk is not taking one.',
        author: 'Satoshi Nakamoto',
        date: '2024-07-18',
        category: 'Market Wisdom',
        reactions: { '🔥': 42, '🚀': 1337, '💎': 69, '🌕': 88 },
        reactedWallets: {},
    },
    {
        id: 2,
        text: 'To the moon!',
        author: 'Every Degen Ever',
        date: '2024-07-17',
        category: 'Degen',
        reactions: { '🔥': 12, '🚀': 50, '💎': 5, '🌕': 200 },
        reactedWallets: {},
    }
];

let userActions: UserActions = {};

// Track total reactions for the leaderboard
let reactionLeaderboard: Record<string, number> = {
    "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t": 21,
    "0x9f8e7d6c5b4a39281706f5e4d3c2b1a0f9e8d7c6": 15,
    "0x11223344556677889900aabbccddeeff11223344": 12,
    "0xabcdef1234567890abcdef1234567890abcdef12": 8,
    "0x5a6b7c8d9e0f1a2b3c4d5e6f7g8h9i0j1k2l3m4n": 5,
};

const getTodayDateString = () => new Date().toISOString().split('T')[0];

export const getTodaysQuote = (): Quote | undefined => {
  const today = getTodayDateString();
  return quotes.find(q => q.date === today);
};

export const getQuoteHistory = (): Quote[] => {
  const today = getTodayDateString();
  return quotes.filter(q => q.date !== today).sort((a, b) => b.id - a.id);
};

export const addQuote = (text: string, author: string | null, walletAddress: string, category?: Category): Quote => {
  const today = getTodayDateString();
  
  const newQuote: Quote = {
    id: quotes.length + 1,
    text,
    author,
    date: today,
    category,
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
  } else {
    // Only increment total reaction count if it's a new reaction, not a changed one.
    reactionLeaderboard[walletAddress] = (reactionLeaderboard[walletAddress] || 0) + 1;
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

export const getLeaderboard = () => {
    return Object.entries(reactionLeaderboard)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([address, count], index) => ({
            rank: index + 1,
            address,
            count,
        }));
}
