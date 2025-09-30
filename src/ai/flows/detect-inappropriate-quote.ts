// src/ai/flows/detect-inappropriate-quote.ts
'use server';

/**
 * @fileOverview Detects potentially inappropriate quotes using Genkit.
 *
 * - detectInappropriateQuote - A function that checks if a quote is inappropriate.
 * - DetectInappropriateQuoteInput - The input type for the detectInappropriateQuote function.
 * - DetectInappropriateQuoteOutput - The return type for the detectInappropriateQuote function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetectInappropriateQuoteInputSchema = z.object({
  quote: z.string().describe('The quote text to be checked.'),
});
export type DetectInappropriateQuoteInput = z.infer<typeof DetectInappropriateQuoteInputSchema>;

const DetectInappropriateQuoteOutputSchema = z.object({
  isAppropriate: z.boolean().describe('Whether the quote is appropriate or not.'),
  reason: z.string().optional().describe('The reason why the quote is inappropriate, if applicable.'),
});
export type DetectInappropriateQuoteOutput = z.infer<typeof DetectInappropriateQuoteOutputSchema>;

export async function detectInappropriateQuote(input: DetectInappropriateQuoteInput): Promise<DetectInappropriateQuoteOutput> {
  return detectInappropriateQuoteFlow(input);
}

const prompt = ai.definePrompt({
  name: 'detectInappropriateQuotePrompt',
  input: {schema: DetectInappropriateQuoteInputSchema},
  output: {schema: DetectInappropriateQuoteOutputSchema},
  prompt: `You are a content moderation AI that helps to detect inappropriate quotes.

  You will analyze the quote provided and determine if it contains offensive language, hate speech, or any other inappropriate content.

  Based on your analysis, you will set the isAppropriate output field to true if the quote is appropriate, and false if it is not. If the quote is not appropriate, you will also provide a reason in the reason output field.

  Quote: {{{quote}}}`,
});

const detectInappropriateQuoteFlow = ai.defineFlow(
  {
    name: 'detectInappropriateQuoteFlow',
    inputSchema: DetectInappropriateQuoteInputSchema,
    outputSchema: DetectInappropriateQuoteOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
