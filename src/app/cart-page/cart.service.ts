import { Injectable, signal } from '@angular/core';
import { Product } from '../../data/products';

export interface CartItem {
  key: string;
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  color?: string | null;
  size?: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly itemsSignal = signal<CartItem[]>([]);
  readonly items = this.itemsSignal.asReadonly();

  addItem(
    product: Product,
    quantity = 1,
    color: string | null = null,
    size: string | null = null,
  ): void {
    const currentItems = this.itemsSignal();
    const existingItem = currentItems.find(
      (item) => item.id === product.id && item.color === color && item.size === size,
    );

    if (existingItem) {
      this.itemsSignal.set(
        currentItems.map((item) =>
          item.key === existingItem.key ? { ...item, quantity: item.quantity + quantity } : item,
        ),
      );
      return;
    }

    this.itemsSignal.set([
      ...currentItems,
      {
        key: `${product.id}-${color ?? 'default'}-${size ?? 'default'}`,
        id: product.id,
        name: product.name,
        price: product.price,
        quantity,
        image: product.imageUrl,
        color,
        size,
      },
    ]);
  }

  increaseQuantity(itemKey: string): void {
    this.itemsSignal.set(
      this.itemsSignal().map((item) =>
        item.key === itemKey ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  }

  decreaseQuantity(itemKey: string): void {
    this.itemsSignal.set(
      this.itemsSignal().map((item) =>
        item.key === itemKey ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item,
      ),
    );
  }

  removeItem(itemKey: string): void {
    this.itemsSignal.set(this.itemsSignal().filter((item) => item.key !== itemKey));
  }

  get subtotal(): number {
    return this.itemsSignal().reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  get shipping(): number {
    return this.itemsSignal().length > 0 ? 5 : 0;
  }

  get total(): number {
    return this.subtotal + this.shipping;
  }
}
