import { Component, computed, inject } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RecentOrders } from '../recent-orders/recent-orders';
import { ProfileService } from '../profile-page/profile.service';

@Component({
  selector: 'app-profile-dashboard',
  standalone: true,
  imports: [RecentOrders, RouterLink, UpperCasePipe],
  templateUrl: './profile-dashboard.html',
  styleUrl: './profile-dashboard.css',
})
export class ProfileDashboard {
  private readonly profileService = inject(ProfileService);

  readonly user = this.profileService.user;
  readonly orders = this.profileService.orders;
  readonly preferredPaymentMethod = this.profileService.preferredPaymentMethod;
  readonly defaultAddress = this.profileService.defaultAddress;

  readonly orderCount = computed(() => this.orders().length);
}
