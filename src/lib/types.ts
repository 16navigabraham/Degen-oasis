export type Reaction = '🔥' | '🚀' | '💎' | '🌕';

export const EMOJI_REACTIONS: Reaction[] = ['🔥', '🚀', '💎', '🌕'];

export const CATEGORIES = [
    'Motivational',
    'Funny',
    'Philosophical',
    'Market Wisdom',
    'Degen',
] as const;
  
export type Category = typeof CATEGORIES[number];

export interface Quote {
  id: number;
  text: string;
  author: string | null;
  date: string; // YYYY-MM-DD
  category?: Category;
  reactions: Record<Reaction, number>;
  reactedWallets: Record<string, Reaction>; // walletAddress -> reaction
}

export interface UserActions {
  [walletAddress: string]: {
    lastQuoteSubmissionDate?: string; // YYYY-MM-DD
    lastReactionDate?: string; // YYYY-MM-DD
  };
}
