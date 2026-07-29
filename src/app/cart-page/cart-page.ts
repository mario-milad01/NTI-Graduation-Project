import { Component, inject } from '@angular/core';
import { CartService } from './cart.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart-page.html',
  styleUrls: ['./cart-page.css'],
})
export class CartPageComponent {
  private readonly cartService = inject(CartService);
  readonly cartItems = this.cartService.items;

  get subtotal(): number {
    return this.cartService.subtotal;
  }

  get shipping(): number {
    return this.cartService.shipping;
  }

  get total(): number {
    return this.cartService.total;
  }

  increaseQuantity(itemKey: string): void {
    this.cartService.increaseQuantity(itemKey);
  }

  decreaseQuantity(itemKey: string): void {
    this.cartService.decreaseQuantity(itemKey);
  }

  removeItem(itemKey: string): void {
    this.cartService.removeItem(itemKey);
  }
}
