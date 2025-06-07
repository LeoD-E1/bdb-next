'use server';

import type { Product } from '@/lib/types';
import { MOCK_PRODUCTS } from '@/lib/constants';

// Simulate a database or state store
let productsStore: Product[] = [...MOCK_PRODUCTS];

export async function getProducts(): Promise<Product[]> {
  await new Promise(resolve => setTimeout(resolve, 500));
  return productsStore;
}

export async function addProductAction(productData: Omit<Product, 'id'>): Promise<Product> {
  await new Promise(resolve => setTimeout(resolve, 300));
  const newProduct: Product = {
    ...productData,
    id: `prod_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
  };
  productsStore.unshift(newProduct); // Add to the beginning for visibility
  return newProduct;
}

export async function updateProductAction(updatedProductData: Product): Promise<Product | null> {
  await new Promise(resolve => setTimeout(resolve, 300));
  const productIndex = productsStore.findIndex(p => p.id === updatedProductData.id);
  if (productIndex === -1) {
    console.error(`Product with ID ${updatedProductData.id} not found for update.`);
    return null;
  }
  productsStore[productIndex] = updatedProductData;
  return updatedProductData;
}

export async function deleteProductAction(productId: string): Promise<{ success: boolean }> {
  await new Promise(resolve => setTimeout(resolve, 300));
  const initialLength = productsStore.length;
  productsStore = productsStore.filter(p => p.id !== productId);
  if (productsStore.length < initialLength) {
    return { success: true };
  } else {
    console.error(`Product with ID ${productId} not found for deletion.`);
    return { success: false };
  }
}
