import { Routes } from '@angular/router';
import { HomePage } from './home-page/home-page';
import { CartPageComponent } from '../cart-page/cart-page';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePage },
  { path: 'cart', component: CartPageComponent },
];
