export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
  sizes: string[];
}

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

export interface OrderData {
  id: string;
  items: CartItem[];
  customerInfo: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
  };
  total: number;
  orderDate: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
}

export interface CustomerInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
}