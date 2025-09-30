'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { addQuote, addReaction, canSubmitQuote } from '@/lib/data';
import { detectInappropriateQuote } from '@/ai/flows/detect-inappropriate-quote';
import type { Reaction, Category } from './types';
import { CATEGORIES } from './types';

const quoteSchema = z.object({
  quote: z.string().min(10, 'Quote must be at least 10 characters.').max(280, 'Quote must be 280 characters or less.'),
  author: z.string().max(50, 'Author name must be 50 characters or less.').optional().or(z.literal('')),
  category: z.enum(CATEGORIES).optional(),
  walletAddress: z.string().startsWith('0x'),
});

export type FormState = {
  message: string;
  type: 'success' | 'error';
  fieldErrors?: Record<string, string[] | undefined>;
} | null;

export async function submitQuote(prevState: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = quoteSchema.safeParse({
    quote: formData.get('quote'),
    author: formData.get('author'),
    category: formData.get('category'),
    walletAddress: formData.get('walletAddress'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Invalid form data.',
      type: 'error',
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { quote, author, walletAddress, category } = validatedFields.data;

  if (!canSubmitQuote(walletAddress)) {
    return { message: 'You can only submit one quote per day.', type: 'error' };
  }

  try {
    const moderationResult = await detectInappropriateQuote({ quote });
    if (!moderationResult.isAppropriate) {
        return { message: `Submission failed moderation: ${moderationResult.reason || 'Inappropriate content detected.'}`, type: 'error'};
    }
  } catch (error) {
    console.error("Moderation check failed:", error);
    return { message: 'Could not verify quote. Please try again later.', type: 'error'};
  }


  addQuote(quote, author || null, walletAddress, category);
  revalidatePath('/');

  return { message: 'Your wisdom has been submitted.', type: 'success' };
}

export async function submitReactionAction(quoteId: number, reaction: Reaction, walletAddress: string) {
    try {
        const result = addReaction(quoteId, reaction, walletAddress);
        if (!result) {
            throw new Error("Failed to add reaction or quote not found.");
        }
        revalidatePath('/');
        return { success: true, message: "Reaction cast!" };
    } catch(e) {
        const error = e as Error;
        return { success: false, message: error.message };
    }
}
