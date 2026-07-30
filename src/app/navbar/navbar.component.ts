import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../cart-page/cart.service';
import { AuthService } from '../features/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  imports: [RouterLink, RouterLinkActive],
})
export class Navbar {
  private readonly cartService = inject(CartService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  readonly cartItems = this.cartService.items;
  readonly currentUser = this.authService.currentUser;
  readonly isLoggedIn = this.authService.isLoggedIn;

  get cartCount(): number {
    return this.cartItems().reduce((count, item) => count + item.quantity, 0);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}
