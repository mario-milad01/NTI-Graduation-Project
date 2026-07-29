import { Component, OnInit } from '@angular/core';
import  {Product , PRODUCTS} from "../../data/products";
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
// import {UpperCasePipe} from '@angular/common';
@Component({
  selector: 'app-product-details-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details-page.html',
  styleUrl: './product-details-page.css',
})

export class ProductDetailsPage implements OnInit {
  product!: Product;
  selectedImage: string = '';
  selectedColor: string | null = null;
  selectedSize: string | null = null;
  quantity: number = 1;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    const foundProduct = PRODUCTS.find(p => p.id === productId);
    this.product = foundProduct || PRODUCTS[0];

    this.selectedImage = this.product.imageUrl;
    this.selectedColor = this.product.colors ? this.product.colors[0] : null;
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
    const itemToCart = {
      id: this.product.id,
      name: this.product.name,
      price: this.product.price,
      color: this.selectedColor,
      size: this.selectedSize,
      quantity: this.quantity,
      image: this.selectedImage
    };

    console.log('Product added to cart:', itemToCart);
    alert(`Added ${this.quantity}x ${this.product.name} to your cart`);
  } 
}

