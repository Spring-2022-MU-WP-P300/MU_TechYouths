export interface CartItem {
  productId: number;
  name: string;
  price: number;
  description: string;
  type: string;
  brand: string;
  currentQuantity: number;
  pictureUrl: string;
  warranty: string;
}

export interface Cart {
  id: number;
  clientId: string;
  items: CartItem[];
}
