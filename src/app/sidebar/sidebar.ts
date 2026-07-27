import { Component } from '@angular/core';

interface NavItem {
  label: string;
  icon: string;
  badge?: number;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {
  userName = 'Alex Rivera';
  userTier = 'Premium Member';

  navItems: NavItem[] = [
    { label: 'Dashboard', icon: '▦' },
    { label: 'Orders', icon: '📦' },
    { label: 'Wishlist', icon: '♡' },
    { label: 'Saved addresses', icon: '📍' },
    { label: 'Payment methods', icon: '💳' },
    { label: 'Notifications', icon: '🔔', badge: 3 },
    { label: 'Settings', icon: '⚙' },
  ];

  activeLabel = 'Dashboard';

  selectItem(label: string) {
    this.activeLabel = label;
  }
}