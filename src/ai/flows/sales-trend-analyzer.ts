'use server';

/**
 * @fileOverview This file defines a Genkit flow for analyzing sales trends.
 *
 * - analyzeSalesTrends - Analyzes sales data to identify frequently ordered combinations.
 * - AnalyzeSalesTrendsInput - The input type for the analyzeSalesTrends function.
 * - AnalyzeSalesTrendsOutput - The return type for the analyzeSalesTrends function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeSalesTrendsInputSchema = z.object({
  orderHistory: z
    .string()
    .describe(
      'A JSON string representing the order history. Each order should contain a list of product names.'
    ),
});
export type AnalyzeSalesTrendsInput = z.infer<typeof AnalyzeSalesTrendsInputSchema>;

const AnalyzeSalesTrendsOutputSchema = z.object({
  frequentCombinations: z
    .string()
    .describe(
      'A list of frequently ordered product combinations, along with their frequency of occurrence.'
    ),
  insights: z.string().describe('Insights on how to optimize the menu and promotions.'),
});
export type AnalyzeSalesTrendsOutput = z.infer<typeof AnalyzeSalesTrendsOutputSchema>;

export async function analyzeSalesTrends(input: AnalyzeSalesTrendsInput): Promise<AnalyzeSalesTrendsOutput> {
  return analyzeSalesTrendsFlow(input);
}

const analyzeSalesTrendsPrompt = ai.definePrompt({
  name: 'analyzeSalesTrendsPrompt',
  input: {schema: AnalyzeSalesTrendsInputSchema},
  output: {schema: AnalyzeSalesTrendsOutputSchema},
  prompt: `You are a restaurant business consultant. Analyze the following order history data and provide insights on frequently ordered combinations to optimize the menu and promotions.

Order History:
{{{orderHistory}}}

Respond with the following structure:

Frequent Combinations:
- List the frequently ordered product combinations and their frequency.

Insights:
- Provide insights on how to optimize the menu and promotions based on the frequent combinations.
`,
});

const analyzeSalesTrendsFlow = ai.defineFlow(
  {
    name: 'analyzeSalesTrendsFlow',
    inputSchema: AnalyzeSalesTrendsInputSchema,
    outputSchema: AnalyzeSalesTrendsOutputSchema,
  },
  async input => {
    try {
      // Parse the order history to ensure it's a valid JSON string
      JSON.parse(input.orderHistory);
    } catch (e) {
      throw new Error('Invalid order history format. Must be a valid JSON string.');
    }

    const {output} = await analyzeSalesTrendsPrompt(input);
    return output!;
  }
);
