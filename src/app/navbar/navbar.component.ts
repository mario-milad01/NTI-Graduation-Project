import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../cart-page/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  imports: [RouterLink, RouterLinkActive],
})
export class Navbar {
  private readonly cartService = inject(CartService);
  readonly cartItems = this.cartService.items;

  get cartCount(): number {
    return this.cartItems().reduce((count, item) => count + item.quantity, 0);
  }
}
