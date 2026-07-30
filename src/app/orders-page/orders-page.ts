import { Component, inject } from '@angular/core';
import { ProfileService } from '../profile-page/profile.service';

@Component({
  selector: 'app-orders-page',
  standalone: true,
  imports: [],
  templateUrl: './orders-page.html',
  styleUrl: './orders-page.css',
})
export class OrdersPage {
  private readonly profileService = inject(ProfileService);
  readonly orders = this.profileService.orders;
}