import { Component } from '@angular/core';
import { ProductDetailsPage } from './product-details-page/product-details-page';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductDetailsPage],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {}