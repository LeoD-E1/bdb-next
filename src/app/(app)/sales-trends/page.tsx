import { SalesAnalysisView } from '@/components/sales-trends/sales-analysis-view';
import { MOCK_ORDERS } from '@/lib/constants';

export default function SalesTrendsPage() {
  // Transform MOCK_ORDERS into the format expected by the AI flow
  const orderHistoryForAI = MOCK_ORDERS.map(order => ({
    products: order.items.map(item => item.name)
  }));
  const orderHistoryJson = JSON.stringify(orderHistoryForAI, null, 2);

  return (
    <div className="container mx-auto py-8">
      <h1 className="font-headline text-4xl mb-8 text-primary">Análisis de Tendencias de Ventas</h1>
      <SalesAnalysisView initialOrderHistoryJson={orderHistoryJson} />
    </div>
  );
}
