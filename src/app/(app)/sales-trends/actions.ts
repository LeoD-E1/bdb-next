'use server';

import { analyzeSalesTrends, type AnalyzeSalesTrendsInput, type AnalyzeSalesTrendsOutput } from '@/ai/flows/sales-trend-analyzer';

export async function analyzeSalesTrendsAction(input: AnalyzeSalesTrendsInput): Promise<AnalyzeSalesTrendsOutput> {
  try {
    // Basic validation for the input string format if needed, though Zod in the flow handles it.
    JSON.parse(input.orderHistory); 
  } catch (e) {
    throw new Error('Invalid order history format. Must be a valid JSON string of product arrays.');
  }
  
  // Simulate some delay if the AI call is very fast, or for local dev consistency
  // await new Promise(resolve => setTimeout(resolve, 1000));

  const result = await analyzeSalesTrends(input);
  return result;
}
