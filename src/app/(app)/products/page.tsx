import { ProductList } from '@/components/products/product-list';
import { MOCK_PRODUCTS } from '@/lib/constants'; // To be replaced by server actions
import { AddProductDialog } from '@/components/products/add-product-dialog';

export default async function ProductsPage() {
  // In a real app, products would be fetched via a server action or API call
  const products = MOCK_PRODUCTS;

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-headline text-4xl text-primary">Gestionar Catálogo</h1>
        <AddProductDialog />
      </div>
      <ProductList initialProducts={products} />
    </div>
  );
}
