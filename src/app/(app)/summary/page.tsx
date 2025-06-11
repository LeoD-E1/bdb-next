import { getSummaryPageData, getAIPromotionSuggestion, type WeeklySummaryData, type MostPopularItem } from './actions';
import { SummaryStatCard } from '@/components/summary/summary-stat-card';
import { SalesOverviewChart } from '@/components/summary/sales-overview-chart';
import { MostPopularItemCard } from '@/components/summary/most-popular-item-card';
import { AiPromotionCard } from '@/components/summary/ai-promotion-card';
import { DollarSign, ShoppingCart, TrendingUp, Lightbulb } from 'lucide-react';
import { formatCurrency } from '@/lib/constants';
import type { SuggestPromotionOutput } from '@/ai/flows/promotion-suggester-flow';

export const dynamic = 'force-dynamic'; // Ensure fresh data on each load

export default async function SummaryPage() {
  const summaryData: WeeklySummaryData = await getSummaryPageData();
  
  let aiSuggestion: SuggestPromotionOutput | null = null;
  let isLoadingAISuggestion = true;
  try {
    aiSuggestion = await getAIPromotionSuggestion({
      mostPopularItemName: summaryData.mostPopularItem?.name,
      weeklyRevenue: summaryData.totalRevenueThisWeek,
      businessType: "restaurante de comida casera de barrio",
      targetAudience: "residentes locales, familias y trabajadores de la zona"
    });
  } catch (error) {
    console.error("Failed to load AI suggestion:", error);
    // aiSuggestion remains null, error handled in AiPromotionCard
  } finally {
    isLoadingAISuggestion = false;
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div>
        <h1 className="font-headline text-4xl text-primary mb-2">Resumen del Negocio</h1>
        <p className="text-muted-foreground">Una vista rápida del rendimiento de Bocado de Barrio esta semana.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <SummaryStatCard
          title="Ingresos Semanales"
          value={formatCurrency(summaryData.totalRevenueThisWeek)}
          icon={DollarSign}
          description="Total generado en los últimos 7 días"
          className="shadow-lg"
        />
        <SummaryStatCard
          title="Pedidos Semanales"
          value={summaryData.totalOrdersThisWeek}
          icon={ShoppingCart}
          description="Total de pedidos en los últimos 7 días"
          className="shadow-lg"
        />
        <MostPopularItemCard item={summaryData.mostPopularItem} />
        <AiPromotionCard suggestion={aiSuggestion} isLoading={isLoadingAISuggestion} />

      </div>

      <SalesOverviewChart data={summaryData.dailySalesChartData} />
      
    </div>
  );
}
