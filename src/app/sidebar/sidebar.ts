import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProfileService } from '../profile-page/profile.service';

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
  private readonly profileService = inject(ProfileService);
  readonly user = this.profileService.user;

  navItems: NavItem[] = [
    { label: 'Profile', icon: '▦', route: '/profile' },
    { label: 'Orders', icon: '📦' },
    { label: 'Saved addresses', icon: '📍' },
    { label: 'Payment methods', icon: '💳', route: '/profile/payment-methods' },
  ];

  activeLabel = 'Dashboard';

  selectItem(label: string) {
    this.activeLabel = label;
  }
}