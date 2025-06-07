'use client';

import type { Product } from '@/lib/types';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/constants';
import { Edit3, Trash2 } from 'lucide-react';
import { ProductFormDialog } from './product-form-dialog'; // For editing
import { deleteProductAction } from '@/app/(app)/products/actions'; // Server action
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type React from 'react';

interface ProductCardProps {
  product: Product;
  onProductUpdate: (updatedProduct: Product) => void;
  onProductDelete: (productId: string) => void;
}

export function ProductCard({ product, onProductUpdate, onProductDelete }: ProductCardProps) {
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      await deleteProductAction(product.id);
      onProductDelete(product.id);
      toast({
        title: "Producto Eliminado",
        description: `El producto "${product.name}" ha sido eliminado.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo eliminar el producto.",
        variant: "destructive",
      });
    }
  };
  
  const aiHintProps = product['data-ai-hint'] ? { 'data-ai-hint': product['data-ai-hint'] } : {};


  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <CardHeader>
        <div className="relative w-full h-48 mb-4 rounded-t-lg overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            {...aiHintProps}
          />
        </div>
        <CardTitle className="font-headline text-2xl text-primary">{product.name}</CardTitle>
        <CardDescription className="text-sm h-10 overflow-hidden text-ellipsis">{product.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-2xl font-semibold text-accent">{formatCurrency(product.price)}</p>
        {product.category && <p className="text-xs text-muted-foreground mt-1">Categoría: {product.category}</p>}
      </CardContent>
      <CardFooter className="flex justify-end space-x-2 border-t pt-4 mt-auto">
        <ProductFormDialog productToEdit={product} onProductSaved={onProductUpdate} triggerButton={
            <Button variant="outline" size="sm">
                <Edit3 className="mr-2 h-4 w-4" /> Editar
            </Button>
        }/>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm">
              <Trash2 className="mr-2 h-4 w-4" /> Eliminar
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción no se puede deshacer. Esto eliminará permanentemente el producto "{product.name}".
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>Eliminar</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
