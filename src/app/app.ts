// <<<<<<< HEAD
// import { Component } from '@angular/core';
// import { ProductDetailsPage } from './product-details-page/product-details-page';
// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [ProductDetailsPage],
// =======
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomePage } from "./home-page/home-page";
import { Navbar } from "./navbar/navbar.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomePage, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {}