'use client';

import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { MostPopularItem } from '@/app/(app)/summary/actions';
import { Star } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';

interface MostPopularItemCardProps {
  item: MostPopularItem | null;
}

export function MostPopularItemCard({ item }: MostPopularItemCardProps) {
  if (!item) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-xl flex items-center">
            <Star className="mr-2 h-5 w-5 text-yellow-400" />
            Producto Estrella
          </CardTitle>
          <CardDescription>Aún no hay datos suficientes para determinar el producto más popular.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Sigue vendiendo para ver qué les gusta más a tus clientes.</p>
        </CardContent>
      </Card>
    );
  }

  const aiHintProps = item.name ? { 'data-ai-hint': item.name.toLowerCase().split(" ").slice(0,2).join(" ") } : {};


  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="font-headline text-xl flex items-center">
          <Star className="mr-2 h-5 w-5 text-yellow-400" />
          ¡El Favorito!
        </CardTitle>
        <CardDescription>Este es el producto más pedido esta semana.</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col items-center text-center">
        {item.imageUrl && (
          <div className="relative w-32 h-32 mb-4 rounded-md overflow-hidden shadow-md">
            <Image
              src={item.imageUrl}
              alt={item.name}
              layout="fill"
              objectFit="cover"
               {...aiHintProps}
            />
          </div>
        )}
        <h3 className="text-2xl font-semibold text-primary">{item.name}</h3>
        <p className="text-muted-foreground">Pedido {item.count} veces esta semana</p>
      </CardContent>
      <CardFooter className="mt-auto pt-4 border-t flex justify-center">
        <Button variant="outline" asChild>
            <Link href={`/products?highlight=${item.productId}`}>Ver Producto</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
