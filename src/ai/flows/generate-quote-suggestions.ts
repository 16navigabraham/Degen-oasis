'use server';

/**
 * @fileOverview A flow that suggests relevant categories for a given quote.
 *
 * - generateQuoteSuggestions - A function that suggests categories for a quote.
 * - GenerateQuoteSuggestionsInput - The input type for the generateQuoteSuggestions function.
 * - GenerateQuoteSuggestionsOutput - The return type for the generateQuoteSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateQuoteSuggestionsInputSchema = z.object({
  quote: z.string().describe('The quote to generate category suggestions for.'),
});
export type GenerateQuoteSuggestionsInput = z.infer<
  typeof GenerateQuoteSuggestionsInputSchema
>;

const GenerateQuoteSuggestionsOutputSchema = z.object({
  categories: z
    .array(z.string())
    .describe('An array of suggested categories for the quote.'),
});
export type GenerateQuoteSuggestionsOutput = z.infer<
  typeof GenerateQuoteSuggestionsOutputSchema
>;

export async function generateQuoteSuggestions(
  input: GenerateQuoteSuggestionsInput
): Promise<GenerateQuoteSuggestionsOutput> {
  return generateQuoteSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateQuoteSuggestionsPrompt',
  input: {schema: GenerateQuoteSuggestionsInputSchema},
  output: {schema: GenerateQuoteSuggestionsOutputSchema},
  prompt: `You are a helpful assistant that suggests relevant categories for a given quote.

  Quote: {{{quote}}}

  Suggest at least 3 categories that this quote would fall under.`,
});

const generateQuoteSuggestionsFlow = ai.defineFlow(
  {
    name: 'generateQuoteSuggestionsFlow',
    inputSchema: GenerateQuoteSuggestionsInputSchema,
    outputSchema: GenerateQuoteSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
