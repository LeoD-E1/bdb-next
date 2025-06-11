import type { Product, Order, NavigationItem, OrderStatus } from './types';
import { LayoutDashboard, ShoppingBasket, LineChart, Settings, UtensilsCrossed, Ban, CheckCircle2, Hourglass, Home } from 'lucide-react';
import PizzaIcon from '@/components/icons/pizza-icon';

export const NAV_ITEMS: NavigationItem[] = [
  { href: '/summary', label: 'Resumen', icon: Home, isActive: (pathname) => pathname.startsWith('/summary') },
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
       { productId: 'prod_1', quantity: 1, name: 'Pizza Margherita', price: 12.99 },
    ],
    totalAmount: 25.99,
    status: 'completed',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2 + 1000 * 60 * 30).toISOString(),
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
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(), // 1 day ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
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
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3 + 1000 * 60 * 30).toISOString(),
  },
  {
    id: 'order_6',
    customerName: 'Laura Sánchez',
    customerPhone: '+34123456789',
    items: [
      { productId: 'prod_1', quantity: 2, name: 'Pizza Margherita', price: 12.99 },
    ],
    totalAmount: 25.98,
    status: 'completed',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString(), // 4 days ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4 + 1000*60*20).toISOString(),
  },
  {
    id: 'order_7',
    customerName: 'Pedro Martín',
    customerPhone: '+34987654321',
    items: [
      { productId: 'prod_2', quantity: 1, name: 'Pizza Pepperoni', price: 14.99 },
      { productId: 'prod_3', quantity: 1, name: 'Coca-Cola', price: 2.50 },
      { productId: 'prod_5', quantity: 1, name: 'Tiramisú', price: 6.50 },
    ],
    totalAmount: 23.99,
    status: 'accepted',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5 + 1000*60*10).toISOString(),
  },
   {
    id: 'order_8',
    customerName: 'Sofía Castillo',
    customerPhone: '+34600000000',
    items: [
      { productId: 'prod_1', quantity: 3, name: 'Pizza Margherita', price: 12.99 },
    ],
    totalAmount: 38.97,
    status: 'pending',
    createdAt: new Date(Date.now() - 1000 * 60 * 3).toISOString(), // 3 minutes ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 3).toISOString(),
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
      return 'text-yellow-600'; 
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

export const formatShortDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('es-ES', {
    month: 'short',
    day: 'numeric',
  });
};
