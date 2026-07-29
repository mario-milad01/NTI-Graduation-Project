// <<<<<<< HEAD
// import { Component } from '@angular/core';
// import { ProductDetailsPage } from './product-details-page/product-details-page';
// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [ProductDetailsPage],
// =======
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class AppComponent {}
