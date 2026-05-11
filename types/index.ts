export interface Category {
  id: string;
  name: string;
  image: string;
}

export interface Slide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  link: string;
}

export interface Product {
  id: number;
  name: string;
  imageName: string;
  price: number;
  discountRate: number;
  review: number;
  categoryId: string;
  categoryName: string;
  type: string;
  description: string;
  inStock: boolean;
  isTopSeller: boolean;
  isNewProduct: boolean;
}

export interface CartItem {
  productId: number;
  name: string;
  imageName: string;
  price: number;
  quantity: number;
}

export interface Cart {
  id: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
}

export interface Address {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
}

export interface CheckoutAddress {
  civility: string;
  firstName: string;
  lastName: string;
  companyName: string;
  street: string;
  city: string;
  county: string;
  zipCode: string;
  email: string;
  phone: string;
}

export type PaymentMethod = 'bacs' | 'cheque' | 'paypal';
export type ProductType = 'tablet' | 'phone' | 'watch';

export interface ApiCartItem {
  id: number;
  name: string;
  imageName: string;
  price: number;
  qty: number;
}

export interface Order {
  id?: number;
  total: number;
  subTotal: number;
  tax: number;
  items: ApiCartItem[];
  paymentMethod: PaymentMethod;
  customer: {
    email: string;
    phone: string;
    note: string;
    billingAdress: Omit<CheckoutAddress, 'email' | 'phone'>;
    shippingAdress?: Omit<CheckoutAddress, 'email' | 'phone'>;
  };
  createdAt?: string;
}
