import type { Product, Order, NavigationItem, OrderStatus } from './types';
import { LayoutDashboard, ShoppingBasket, LineChart, Settings, UtensilsCrossed, Ban, CheckCircle2, Hourglass } from 'lucide-react';
import PizzaIcon from '@/components/icons/pizza-icon';

export const NAV_ITEMS: NavigationItem[] = [
  { href: '/dashboard', label: 'Pedidos', icon: LayoutDashboard, isActive: (pathname) => pathname.startsWith('/dashboard') },
  { href: '/products', label: 'Productos', icon: ShoppingBasket, isActive: (pathname) => pathname.startsWith('/products') },
  { href: '/sales-trends', label: 'Tendencias', icon: LineChart, isActive: (pathname) => pathname.startsWith('/sales-trends') },
  { href: '/settings', label: 'Configuración', icon: Settings, isActive: (pathname) => pathname.startsWith('/settings') },
];

export const MOCK_PRODUCTS: Product[] = [
  { id: 'prod_1', name: 'Pizza Margherita', price: 12.99, imageUrl: 'https://placehold.co/300x200.png', description: 'Classic Margherita with fresh mozzarella and basil.', category: 'Pizzas', 'data-ai-hint': 'margherita pizza' },
  { id: 'prod_2', name: 'Pizza Pepperoni', price: 14.99, imageUrl: 'https://placehold.co/300x200.png', description: 'Spicy pepperoni on a cheesy base.', category: 'Pizzas', 'data-ai-hint': 'pepperoni pizza' },
  { id: 'prod_3', name: 'Coca-Cola', price: 2.50, imageUrl: 'https://placehold.co/300x200.png', description: 'Refreshing Coca-Cola.', category: 'Drinks', 'data-ai-hint': 'soda can' },
  { id: 'prod_4', name: 'Ensalada César', price: 9.99, imageUrl: 'https://placehold.co/300x200.png', description: 'Crisp romaine lettuce, croutons, Parmesan cheese, and Caesar dressing.', category: 'Salads', 'data-ai-hint': 'caesar salad' },
  { id: 'prod_5', name: 'Tiramisú', price: 6.50, imageUrl: 'https://placehold.co/300x200.png', description: 'Classic Italian dessert.', category: 'Desserts', 'data-ai-hint': 'tiramisu cake' },
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'order_1',
    customerName: 'Juan Pérez',
    customerPhone: '+1234567890',
    items: [
      { productId: 'prod_1', quantity: 1, name: 'Pizza Margherita', price: 12.99 },
      { productId: 'prod_3', quantity: 2, name: 'Coca-Cola', price: 2.50 },
    ],
    totalAmount: 17.99,
    status: 'pending',
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  },
  {
    id: 'order_2',
    customerName: 'Ana Gómez',
    customerPhone: '+0987654321',
    items: [
      { productId: 'prod_2', quantity: 1, name: 'Pizza Pepperoni', price: 14.99 },
      { productId: 'prod_4', quantity: 1, name: 'Ensalada César', price: 9.99 },
    ],
    totalAmount: 24.98,
    status: 'accepted',
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
  {
    id: 'order_3',
    customerName: 'Carlos López',
    customerPhone: '+1122334455',
    items: [
      { productId: 'prod_5', quantity: 2, name: 'Tiramisú', price: 6.50 },
    ],
    totalAmount: 13.00,
    status: 'completed',
    createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // 2 hours ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
  },
    {
    id: 'order_4',
    customerName: 'Lucia Fernandez',
    customerPhone: '+5544332211',
    items: [
      { productId: 'prod_1', quantity: 1, name: 'Pizza Margherita', price: 12.99 },
      { productId: 'prod_2', quantity: 1, name: 'Pizza Pepperoni', price: 14.99 },
      { productId: 'prod_3', quantity: 4, name: 'Coca-Cola', price: 2.50 },
    ],
    totalAmount: 37.98,
    status: 'pending',
    createdAt: new Date(Date.now() - 1000 * 60 * 2).toISOString(), // 2 minutes ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
  },
  {
    id: 'order_5',
    customerName: 'Miguel Rodriguez',
    customerPhone: '+6677889900',
    items: [
      { productId: 'prod_4', quantity: 2, name: 'Ensalada César', price: 9.99 },
    ],
    totalAmount: 19.98,
    status: 'rejected',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3 hours ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2.5).toISOString(),
  },
];

export const ORDER_STATUS_OPTIONS: OrderStatus[] = ['pending', 'accepted', 'completed', 'rejected'];

export const getOrderStatusIcon = (status: OrderStatus): React.ElementType => {
  switch (status) {
    case 'pending':
      return Hourglass;
    case 'accepted':
      return UtensilsCrossed;
    case 'completed':
      return PizzaIcon;
    case 'rejected':
      return Ban;
    default:
      return CheckCircle2;
  }
};

export const getOrderStatusColor = (status: OrderStatus): string => {
  switch (status) {
    case 'pending':
      return 'text-yellow-600'; // Using Tailwind direct color for status for clarity
    case 'accepted':
      return 'text-blue-600';
    case 'completed':
      return 'text-green-600';
    case 'rejected':
      return 'text-red-600';
    default:
      return 'text-gray-600';
  }
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(amount);
};

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};
