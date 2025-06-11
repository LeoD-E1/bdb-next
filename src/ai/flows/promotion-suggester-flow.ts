'use server';
/**
 * @fileOverview A Genkit flow to suggest promotions based on sales data.
 *
 * - suggestPromotion - Generates a promotion suggestion.
 * - SuggestPromotionInput - The input type for the suggestPromotion function.
 * - SuggestPromotionOutput - The return type for the suggestPromotion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestPromotionInputSchema = z.object({
  mostPopularItemName: z.string().optional().describe('The name of the most popular item sold recently.'),
  weeklyRevenue: z.number().optional().describe('The total revenue generated in the past week.'),
  businessType: z.string().default('local neighborhood kitchen').describe('The type of food business, e.g., pizza place, cafe, bakery.'),
  targetAudience: z.string().default('local residents and families').describe('The primary target audience for the business.'),
});
export type SuggestPromotionInput = z.infer<typeof SuggestPromotionInputSchema>;

const SuggestPromotionOutputSchema = z.object({
  suggestionTitle: z.string().describe('A catchy title for the promotion.'),
  suggestionDetails: z.string().describe('A detailed description of the promotion, including mechanics and potential benefits.'),
  targetItems: z.array(z.string()).optional().describe('Specific items that could be part of this promotion.'),
});
export type SuggestPromotionOutput = z.infer<typeof SuggestPromotionOutputSchema>;

export async function suggestPromotion(input: SuggestPromotionInput): Promise<SuggestPromotionOutput> {
  return promotionSuggesterFlow(input);
}

const promotionSuggesterPrompt = ai.definePrompt({
  name: 'promotionSuggesterPrompt',
  input: {schema: SuggestPromotionInputSchema},
  output: {schema: SuggestPromotionOutputSchema},
  prompt: `You are a marketing expert for a {{businessType}}. Your goal is to devise a creative and effective promotion to attract more customers and increase sales.

Current business context:
{{#if mostPopularItemName}}
- The most popular item recently is: {{mostPopularItemName}}. Consider leveraging its popularity.
{{/if}}
{{#if weeklyRevenue}}
- The weekly revenue is approximately: {{weeklyRevenue}} EUR.
{{/if}}
- The target audience is: {{targetAudience}}.

Based on this information, generate a compelling promotion suggestion. Provide a catchy title, detailed explanation of how it works, and optionally, which items it should target. Be specific and actionable.
Example: If 'Pizza Margherita' is popular, a promotion could be "Margherita Madness Mondays: Get 20% off all Margherita Pizzas every Monday!"

Ensure the response is structured according to the output schema.
`,
});

const promotionSuggesterFlow = ai.defineFlow(
  {
    name: 'promotionSuggesterFlow',
    inputSchema: SuggestPromotionInputSchema,
    outputSchema: SuggestPromotionOutputSchema,
  },
  async (input) => {
    const {output} = await promotionSuggesterPrompt(input);
    if (!output) {
        throw new Error("AI failed to generate a promotion suggestion.");
    }
    return output;
  }
);
