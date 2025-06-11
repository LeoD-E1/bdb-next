'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { SuggestPromotionOutput } from '@/ai/flows/promotion-suggester-flow';
import { Lightbulb, Loader2 } from 'lucide-react';

interface AIPromotionCardProps {
  suggestion: SuggestPromotionOutput | null;
  isLoading: boolean;
}

export function AiPromotionCard({ suggestion, isLoading }: AIPromotionCardProps) {
  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle className="font-headline text-xl flex items-center">
          <Lightbulb className="mr-2 h-5 w-5 text-primary" />
          Sugerencia de Promoción IA
        </CardTitle>
        <CardDescription>Una idea para impulsar tu negocio, generada por IA.</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div className="flex items-center justify-center h-24">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="ml-3 text-muted-foreground">Generando idea...</p>
          </div>
        )}
        {!isLoading && suggestion && (
          <div className="space-y-3">
            <h4 className="font-semibold text-lg text-primary">{suggestion.suggestionTitle}</h4>
            <p className="text-sm whitespace-pre-wrap">{suggestion.suggestionDetails}</p>
            {suggestion.targetItems && suggestion.targetItems.length > 0 && (
              <div>
                <p className="text-xs font-medium text-muted-foreground">Productos sugeridos:</p>
                <ul className="list-disc list-inside pl-2 text-sm">
                  {suggestion.targetItems.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
        {!isLoading && !suggestion && (
           <p className="text-sm text-muted-foreground">No se pudo generar una sugerencia en este momento.</p>
        )}
      </CardContent>
    </Card>
  );
}
