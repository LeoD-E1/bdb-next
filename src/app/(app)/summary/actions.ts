'use server';

import type { Order, Product } from '@/lib/types';
import { MOCK_ORDERS, MOCK_PRODUCTS } from '@/lib/constants';
import { suggestPromotion, type SuggestPromotionInput, type SuggestPromotionOutput } from '@/ai/flows/promotion-suggester-flow';

export interface DailySalesData {
  date: string; // Format: 'YYYY-MM-DD' or 'Mon DD'
  orders: number;
  revenue: number;
}

export interface MostPopularItem {
  name: string;
  count: number;
  imageUrl?: string;
  productId: string;
}

export interface WeeklySummaryData {
  totalOrdersThisWeek: number;
  totalRevenueThisWeek: number;
  mostPopularItem: MostPopularItem | null;
  dailySalesChartData: DailySalesData[];
}

// Helper function to get date string for the last N days
function getPastNDays(days: number): string[] {
  const dates: string[] = [];
  for (let i = 0; i < days; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    dates.push(d.toISOString().split('T')[0]); // YYYY-MM-DD
  }
  return dates.reverse(); // Oldest to newest
}

export async function getSummaryPageData(): Promise<WeeklySummaryData> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 700));

  const today = new Date();
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 7);
  sevenDaysAgo.setHours(0, 0, 0, 0); // Start of 7 days ago

  const ordersThisWeek = MOCK_ORDERS.filter(order => {
    const orderDate = new Date(order.createdAt);
    return orderDate >= sevenDaysAgo;
  });

  const totalOrdersThisWeek = ordersThisWeek.length;
  const totalRevenueThisWeek = ordersThisWeek.reduce((sum, order) => sum + order.totalAmount, 0);

  // Most Popular Item
  const itemCounts: Record<string, { count: number; name: string; imageUrl?: string; productId: string }> = {};
  ordersThisWeek.forEach(order => {
    order.items.forEach(item => {
      if (!itemCounts[item.productId]) {
        const productDetails = MOCK_PRODUCTS.find(p => p.id === item.productId);
        itemCounts[item.productId] = { 
            count: 0, 
            name: item.name, 
            imageUrl: productDetails?.imageUrl,
            productId: item.productId
        };
      }
      itemCounts[item.productId].count += item.quantity;
    });
  });

  let mostPopularItem: MostPopularItem | null = null;
  if (Object.keys(itemCounts).length > 0) {
    const sortedItems = Object.values(itemCounts).sort((a, b) => b.count - a.count);
    mostPopularItem = sortedItems[0];
  }

  // Daily Sales Chart Data (Last 7 days)
  const pastSevenDays = getPastNDays(7); // ['YYYY-MM-DD', ...]
  const dailySalesChartData: DailySalesData[] = pastSevenDays.map(dateStr => {
    const ordersOnDate = ordersThisWeek.filter(order => order.createdAt.startsWith(dateStr));
    const revenueOnDate = ordersOnDate.reduce((sum, order) => sum + order.totalAmount, 0);
    return {
      date: new Date(dateStr).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' }), // Format for display
      orders: ordersOnDate.length,
      revenue: revenueOnDate,
    };
  });

  return {
    totalOrdersThisWeek,
    totalRevenueThisWeek,
    mostPopularItem,
    dailySalesChartData,
  };
}


export async function getAIPromotionSuggestion(input: SuggestPromotionInput): Promise<SuggestPromotionOutput> {
    // Simulate API delay for AI
    await new Promise(resolve => setTimeout(resolve, 1200));
    try {
        const suggestion = await suggestPromotion(input);
        return suggestion;
    } catch (error) {
        console.error("Error getting AI promotion suggestion:", error);
        // Fallback suggestion
        return {
            suggestionTitle: "Oferta Especial Semanal",
            suggestionDetails: "Considera ofrecer un descuento en tu producto más popular o un combo especial para atraer más clientes esta semana.",
            targetItems: input.mostPopularItemName ? [input.mostPopularItemName] : [],
        };
    }
}
