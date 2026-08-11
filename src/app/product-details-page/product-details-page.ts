import { Component, OnInit, inject } from '@angular/core';
import { Product, PRODUCTS } from '../../data/products';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CartService } from '../cart-page/cart.service';

@Component({
  selector: 'app-product-details-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-details-page.html',
  styleUrl: './product-details-page.css',
})
export class ProductDetailsPage implements OnInit {
  product!: Product;
  selectedImage: string = '';
  selectedColor: string | null = null;
  selectedSize: string | null = null;
  quantity: number = 1;

  private readonly route = inject(ActivatedRoute);
  private readonly cartService = inject(CartService);

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    const foundProduct = PRODUCTS.find((p) => p.id === productId);
    this.product = foundProduct || PRODUCTS[0];

    this.selectedImage = this.product.imageUrl;

    this.selectedSize = this.product.sizes ? this.product.sizes[0] : null;
  }

  selectColor(color: string): void {
    this.selectedColor = color;
  }

  selectSize(size: string): void {
    this.selectedSize = size;
  }

  increaseQuantity(): void {
    this.quantity++;
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) this.quantity--;
  }

  addToCart(): void {
    this.cartService.addItem(this.product, this.quantity, this.selectedColor, this.selectedSize);
    
    // alert(`Added ${this.quantity}x ${this.product.name} to your cart`);
  }
}
