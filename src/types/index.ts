export interface Product {
  id: number;
  name: string;
  category: CategoryName;
  categorySlug: string;
  price: number;
  mrp: number;
  image: string;
  gallery?: string[];
  rating: number;
  reviewCount: number;
  shortDesc: string;
  description: string;
  highlights: string[];
  specs?: Record<string, string>;
  isTrending?: boolean;
  isProblemSolver?: boolean;
  tags: string[];
  inStock: boolean;
}

export type CategoryName =
  | 'For Him'
  | 'For Her'
  | 'Jewellery'
  | 'Grocery & Utility'
  | 'Electronics'
  | 'Clothes'
  | 'Shoes'
  | 'Home'
  | 'Beauty'
  | 'Fitness'
  | 'Auto & Bike'
  | 'Travel';

export interface CategoryItem {
  id: string;
  name: CategoryName;
  slug: string;
  description: string;
  iconName: string;
  featuredProductCount: number;
}

export interface CartItem {
  productId: number;
  quantity: number;
  addedAt: string;
}

export interface BuyNowState {
  productId: number;
  quantity: number;
}

export interface CustomerInfo {
  fullName: string;
  mobile: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  notes?: string;
}

export interface OrderItem {
  product: Product;
  quantity: number;
  price: number;
}

export interface OrderRecord {
  orderId: string;
  createdAt: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  customer: CustomerInfo;
  paymentMethod: 'Cash on Delivery' | 'Demo Online Payment (Simulated)';
  paymentStatus?: 'Pending/Cash on Delivery' | 'DEMO PAID — NOT REAL';
  status: 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered';
}

export interface FeedbackRecord {
  id: string;
  name: string;
  email: string;
  topic: string;
  rating: number;
  message: string;
  createdAt: string;
}

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'newest';
