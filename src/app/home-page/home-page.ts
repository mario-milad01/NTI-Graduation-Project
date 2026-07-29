import { Component } from '@angular/core';
import { Hero } from "../hero/hero";
import { PRODUCTS, Product } from '../../data/products';
import { ProductCard } from "../product-card/product-card";
@Component({
  selector: 'app-home-page',
  imports: [Hero, ProductCard],
  templateUrl: './home-page.html',
  styleUrls: ['./home-page.css',"../product-card/product-card.css"],
})
export class HomePage {
  productList: Product[] = PRODUCTS;
  catagory:'Apparel'|'Furniture'|'Home & Kitchen' |'all'|'electronics' = 'all'
  filteredProducts = this.productList;
  handleSetFilter(type:any):void{
    this.catagory = type;
    if(type==='all'){
      this.filteredProducts = this.productList;
    }else{
      this.filteredProducts = this.productList.filter(product=>{
      return product.category.trim().toLowerCase() === type.trim().toLowerCase();
    });
    }
    
  }
  
}
