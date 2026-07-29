import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavItem {
  label: string;
  icon: string;
  badge?: number;
  route?: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  userName = 'Alex Rivera';
  userTier = 'Premium Member';

  navItems: NavItem[] = [
    { label: 'Profile', icon: '▦', route: '/profile' },
    { label: 'Orders', icon: '📦' },
    { label: 'Wishlist', icon: '♡' },
    { label: 'Saved addresses', icon: '📍' },
    { label: 'Payment methods', icon: '💳', route: '/profile/payment-methods' },
    { label: 'Settings', icon: '⚙' },
  ];

  activeLabel = 'Dashboard';

  selectItem(label: string) {
    this.activeLabel = label;
  }
}
