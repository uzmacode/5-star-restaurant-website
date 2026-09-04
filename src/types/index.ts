export type DietaryTag = 'V' | 'VG' | 'GF' | 'DF' | 'NF' | 'RAW';

export interface MenuItem {
  id: string;
  name: string;
  category: 'starters' | 'mains' | 'desserts' | 'botanical-cellar' | 'tasting-menu';
  description: string;
  price: number;
  dietary: DietaryTag[];
  image: string;
  isSignature?: boolean;
  pairingNote?: string;
  calories?: number;
  preparationTime?: string;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  specialInstructions?: string;
}

export interface ReservationDetails {
  id?: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  seatingArea: 'Botanical Glasshouse' | 'Main Dining Salon' | 'Chef’s Hearth Counter' | 'Herb Garden Terrace';
  table?: string;
  specialRequests?: string;
  dietaryRequirements?: string[];
  occasion?: string;
  createdAt?: string;
  status?: 'Confirmed' | 'Pending';
}

export interface OrderDetails {
  id: string;
  orderNumber: string;
  createdAt: string;
  type: 'pickup' | 'delivery';
  guest: {
    name: string;
    email: string;
    phone: string;
    address?: string;
    postalCode?: string;
    instructions?: string;
  };
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  serviceTax: number;
  total: number;
  status: 'Received' | 'In Preparation' | 'Out for Delivery' | 'Ready for Pickup' | 'Completed';
  estimatedTime: string;
  paymentMethod: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Interior' | 'Food' | 'Events';
  image: string;
  aspect: string;
  caption: string;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  rating: number;
  quote: string;
  source: string;
  date: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}
