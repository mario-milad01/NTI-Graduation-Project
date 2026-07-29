import { Routes } from '@angular/router';
import { HomePage } from './home-page/home-page';
import { ProductDetailsPage } from './product-details-page/product-details-page';
import { CartPageComponent } from './cart-page/cart-page';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  // {path:'login',component:LoginPage},
  // {path:'signup',component:SignupPage}
  { path: 'home', component: HomePage },
  // {path:'profile',component:ProfilePage},
  { path: 'cart', component: CartPageComponent },
  { path: 'product/:id', component: ProductDetailsPage },
];
