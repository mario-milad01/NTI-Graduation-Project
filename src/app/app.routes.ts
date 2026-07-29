import { Routes } from '@angular/router';
import { HomePage } from './home-page/home-page';
import { ProductDetailsPage } from './product-details-page/product-details-page';
import { CartPageComponent } from './cart-page/cart-page';
import { ProfilePage } from './profile-page/profile-page';
import { ProfileDashboard } from './profile-dashboard/profile-dashboard';
import { PaymentMethods } from './payment-methods/payment-methods';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  // {path:'login',component:LoginPage},
  // {path:'signup',component:SignupPage}
  { path: 'home', component: HomePage },
  // {path:'profile',component:ProfilePage},
  { path: 'cart', component: CartPageComponent },
  { path: 'product/:id', component: ProductDetailsPage },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  // {path:'login',component:LoginPage},
  // {path:'signup',component:SignupPage}
  { path: 'home', component: HomePage },
  {
    path: 'profile',
    component: ProfilePage,
    children: [
      { path: '', component: ProfileDashboard },
      { path: 'payment-methods', component: PaymentMethods },
    ],
  },
  // {path:'cart',component:CartPage},
];
