import { Injectable, inject, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  private readonly snackBar = inject(MatSnackBar);
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
    } else {
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

    // Prepare details string for color/size if present
    const details = [color, size].filter(Boolean).join(' / ');
    const detailString = details ? ` (${details})` : '';

    // Trigger SnackBar with item data
    this.snackBar.open(
      `Added ${quantity}x "${product.name}"${detailString} to your cart!`,
      'Close',
      {
        duration: 3500,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
      }
    );
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
    const itemToRemove = this.itemsSignal().find((item) => item.key === itemKey);
    this.itemsSignal.set(this.itemsSignal().filter((item) => item.key !== itemKey));

    if (itemToRemove) {
      this.snackBar.open(`Removed "${itemToRemove.name}" from your cart`, 'Close', {
        duration: 3500,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
      });
    }
  }

  clear(): void {
    this.itemsSignal.set([]);
  }

  get subtotal(): number {
const rawSubtotal = this.itemsSignal().reduce((sum, item) => sum + item.price * item.quantity, 0);
  return Number(rawSubtotal.toFixed(2)); 
 }

  get shipping(): number {
    return this.itemsSignal().length > 0 ? 5 : 0;
  }

  get total(): number {
    return Number((this.subtotal + this.shipping).toFixed(2));
  }
}