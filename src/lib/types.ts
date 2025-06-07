export type Product = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description?: string;
  category?: string; // Optional: for better organization if needed later
};

export type OrderItem = {
  productId: string;
  quantity: number;
  name: string; // Denormalized for easier display
  price: number; // Denormalized for easier display
};

export type OrderStatus = 'pending' | 'accepted' | 'rejected' | 'completed';

export type Order = {
  id: string;
  customerName: string;
  customerPhone: string; // Assuming WhatsApp means phone number is key
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
};

export type NavigationItem = {
  href: string;
  label: string;
  icon: React.ElementType;
  isActive?: (pathname: string) => boolean;
};
