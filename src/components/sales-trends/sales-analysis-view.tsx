'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { analyzeSalesTrendsAction } from '@/app/(app)/sales-trends/actions';
import type { AnalyzeSalesTrendsOutput } from '@/ai/flows/sales-trend-analyzer';
import { Loader2, Lightbulb, ListChecks } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SalesAnalysisViewProps {
  initialOrderHistoryJson: string;
}

export function SalesAnalysisView({ initialOrderHistoryJson }: SalesAnalysisViewProps) {
  const [orderHistory, setOrderHistory] = useState(initialOrderHistoryJson);
  const [analysisResult, setAnalysisResult] = useState<AnalyzeSalesTrendsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);
    try {
      const result = await analyzeSalesTrendsAction({ orderHistory });
      setAnalysisResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocurrió un error al analizar las tendencias.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-xl">Historial de Pedidos (JSON)</CardTitle>
          <CardDescription>
            Datos de pedidos utilizados para el análisis. Edita si es necesario (asegúrate de que el formato JSON sea válido).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={orderHistory}
            onChange={(e) => setOrderHistory(e.target.value)}
            rows={10}
            className="font-code text-sm"
            placeholder="Pega aquí el historial de pedidos en formato JSON..."
          />
        </CardContent>
        <CardFooter>
          <Button onClick={handleAnalyze} disabled={isLoading} className="ml-auto">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analizando...
              </>
            ) : (
              'Analizar Tendencias'
            )}
          </Button>
        </CardFooter>
      </Card>

      {error && (
        <Card className="border-destructive bg-destructive/10">
          <CardHeader>
            <CardTitle className="text-destructive font-headline">Error en el Análisis</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-destructive">{error}</p>
          </CardContent>
        </Card>
      )}

      {analysisResult && (
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-xl flex items-center">
                <ListChecks className="mr-2 h-6 w-6 text-primary" />
                Combinaciones Frecuentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[200px] pr-4">
                <pre className="text-sm whitespace-pre-wrap break-words bg-muted p-3 rounded-md">
                  {analysisResult.frequentCombinations}
                </pre>
              </ScrollArea>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-xl flex items-center">
                <Lightbulb className="mr-2 h-6 w-6 text-primary" />
                Recomendaciones
              </CardTitle>
            </CardHeader>
            <CardContent>
               <ScrollArea className="h-[200px] pr-4">
                <pre className="text-sm whitespace-pre-wrap break-words bg-muted p-3 rounded-md">
                  {analysisResult.insights}
                </pre>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
