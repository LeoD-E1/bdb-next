'use client';

import type { Product } from '@/lib/types';
import { ProductCard } from './product-card';
import { useState, useEffect } from 'react';

interface ProductListProps {
  initialProducts: Product[];
}

export function ProductList({ initialProducts }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts]);

  const handleProductUpdate = (updatedProduct: Product) => {
    setProducts(prevProducts => 
      prevProducts.map(p => p.id === updatedProduct.id ? updatedProduct : p)
    );
  };

  const handleProductDelete = (productId: string) => {
    setProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
  };
  
  // This is a workaround for a potential hydration mismatch if initialProducts is empty
  // and the client renders something different immediately.
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);


  if (!isClient) {
    // Render nothing or a placeholder on the server to avoid hydration mismatch
    // if initialProducts might be empty or conditional.
    return null; 
  }


  if (products.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-xl text-muted-foreground">No hay productos en el catálogo.</p>
        <p className="text-sm text-muted-foreground">Añade productos para empezar a vender.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map(product => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onProductUpdate={handleProductUpdate}
          onProductDelete={handleProductDelete}
        />
      ))}
    </div>
  );
}
