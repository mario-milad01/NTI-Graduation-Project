import { Routes } from '@angular/router';
import { HomePage } from './home-page/home-page';
import { ProductDetailsPage } from './product-details-page/product-details-page';
import { CartPageComponent } from './cart-page/cart-page';
import { ProfilePage } from './profile-page/profile-page';
import { ProfileDashboard } from './profile-dashboard/profile-dashboard';
import { PaymentMethods } from './payment-methods/payment-methods';
import { OrdersPage } from './orders-page/orders-page';
import { AddressesPage } from './addresses-page/addresses-page';
import { LoginComponent } from './features/auth/login/login.component';
import { SignupComponent } from './features/auth/signup/signup.component';
import { CheckoutComponent } from './features/checkout/checkout.component';
import { authGuard, guestGuard } from './features/auth/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [guestGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [guestGuard] },
  { path: 'home', component: HomePage },
  { path: 'cart', component: CartPageComponent },
  { path: 'checkout', component: CheckoutComponent, canActivate: [authGuard] },
  { path: 'product/:id', component: ProductDetailsPage },
  {
    path: 'profile',
    component: ProfilePage,
    canActivate: [authGuard],
    children: [
      { path: '', component: ProfileDashboard },
      { path: 'orders', component: OrdersPage },
      { path: 'addresses', component: AddressesPage },
      { path: 'payment-methods', component: PaymentMethods },
    ],
  },
];
