import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  @Input () productData !:{
    id:string;
    description:string;
    name:string;
    imageUrl:string;
    price:number;
  } ;
}
