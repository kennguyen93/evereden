export type Category = 'BESTSELLERS' | 'KIDS' | 'TEENS (AGES 11+)' | 'SUNCARE' | 'MOM & BABY' | 'SAVE WITH SETS' | 'GEN E';

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  savePercentage?: number;
  rating: number;
  reviewsCount: number;
  description: string;
  category: Category[];
  badges: string[]; // e.g., 'BESTSELLER', 'VALUE SET', 'NEW', 'REFILL AVAILABLE'
  imageType: 'body-wash' | 'deo-duo' | 'face-trio' | 'shampoo-pump' | 'conditioner-pump' | 'sunscreen-headband' | 'clay-cleanser' | 'lotion-pump';
  imageColors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  details: string;
  ingredients: string[];
  howToUse: string;
  sizes: string[];
  scents: string[];
  subTitle?: string;
}

export interface CartItem {
  id: string; // unique cart item id (product.id + size + scent)
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedScent: string;
}
