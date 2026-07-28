import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomePage } from "./home-page/home-page";
import { Navbar } from "./navbar/navbar.component";
import { CartPageComponent } from "./cart-page/cart-page";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomePage, Navbar, CartPageComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('E-Commerce-app');
}
