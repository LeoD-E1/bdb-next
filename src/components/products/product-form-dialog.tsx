'use client';

import type React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { addProductAction, updateProductAction } from '@/app/(app)/products/actions'; // Server actions
import { PlusCircle } from 'lucide-react';

const productSchema = z.object({
  name: z.string().min(3, { message: 'El nombre debe tener al menos 3 caracteres.' }),
  price: z.coerce.number().positive({ message: 'El precio debe ser un número positivo.' }),
  imageUrl: z.string().url({ message: 'Por favor, introduce una URL de imagen válida.' }).or(z.literal('')),
  description: z.string().optional(),
  category: z.string().optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductFormDialogProps {
  productToEdit?: Product;
  onProductSaved: (product: Product) => void;
  triggerButton?: React.ReactNode;
}

export function ProductFormDialog({ productToEdit, onProductSaved, triggerButton }: ProductFormDialogProps) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const isEditing = !!productToEdit;

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: isEditing
      ? {
          name: productToEdit.name,
          price: productToEdit.price,
          imageUrl: productToEdit.imageUrl,
          description: productToEdit.description || '',
          category: productToEdit.category || '',
        }
      : {
          name: '',
          price: 0,
          imageUrl: '',
          description: '',
          category: '',
        },
  });

  const onSubmit = async (data: ProductFormData) => {
    try {
      let savedProduct;
      const productData = {
        ...data,
        imageUrl: data.imageUrl || `https://placehold.co/300x200.png?text=${encodeURIComponent(data.name)}`,
        'data-ai-hint': data.name.toLowerCase().split(" ").slice(0,2).join(" ")
      };

      if (isEditing && productToEdit) {
        savedProduct = await updateProductAction({ ...productToEdit, ...productData });
      } else {
        savedProduct = await addProductAction(productData);
      }
      
      if(savedProduct) {
        onProductSaved(savedProduct);
        toast({
          title: `Producto ${isEditing ? 'Actualizado' : 'Añadido'}`,
          description: `El producto "${savedProduct.name}" ha sido ${isEditing ? 'actualizado' : 'añadido'} correctamente.`,
        });
        setOpen(false);
        form.reset();
      } else {
        throw new Error("Server action did not return a product.");
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: `No se pudo ${isEditing ? 'actualizar' : 'añadir'} el producto. Inténtalo de nuevo.`,
        variant: 'destructive',
      });
    }
  };
  
  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      form.reset(isEditing ? productToEdit : { name: '', price: 0, imageUrl: '', description: '', category: '' });
    }
  }


  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {triggerButton ? triggerButton : (
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Añadir Producto
        </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl text-primary">
            {isEditing ? 'Editar Producto' : 'Añadir Nuevo Producto'}
          </DialogTitle>
          <DialogDescription>
            {isEditing ? 'Modifica los detalles de este producto.' : 'Introduce los detalles del nuevo producto.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre del Producto</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: Pizza Especial" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Precio (€)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" placeholder="Ej: 12.99" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL de la Imagen</FormLabel>
                  <FormControl>
                    <Input placeholder="https://ejemplo.com/imagen.jpg" {...field} />
                  </FormControl>
                   <FormDescription>Si se deja vacío, se usará un placeholder.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción (Opcional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Breve descripción del producto..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoría (Opcional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: Pizzas, Bebidas" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Guardando...' : (isEditing ? 'Guardar Cambios' : 'Añadir Producto')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
