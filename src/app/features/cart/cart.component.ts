import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

export interface CartItem {
  id: string;
  name: string;
  variant: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

const TAX_RATE = 0.0825;

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  items = signal<CartItem[]>([
    {
      id: 'tote-charcoal',
      name: 'Signature Leather Tote',
      variant: 'Charcoal Grey | One Size',
      price: 245.0,
      quantity: 1,
      imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=200&h=200&fit=crop',
    },
    {
      id: 'chrono-rosegold',
      name: 'Horizon Chronograph',
      variant: 'Rose Gold | Mesh',
      price: 189.0,
      quantity: 1,
      imageUrl: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=200&h=200&fit=crop',
    },
  ]);

  promoCode = signal('');

  itemCount = computed(() =>
    this.items().reduce((total, item) => total + item.quantity, 0)
  );

  subtotal = computed(() =>
    this.items().reduce((total, item) => total + item.price * item.quantity, 0)
  );

  tax = computed(() => this.subtotal() * TAX_RATE);

  total = computed(() => this.subtotal() + this.tax());

  increment(itemId: string): void {
    this.items.update((items) =>
      items.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }

  decrement(itemId: string): void {
    this.items.update((items) =>
      items.map((item) =>
        item.id === itemId
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
    );
  }

  remove(itemId: string): void {
    this.items.update((items) => items.filter((item) => item.id !== itemId));
  }

  applyPromoCode(): void {
    // TODO: connect to your backend promo validation
    console.log('Promo code applied:', this.promoCode());
  }
}
