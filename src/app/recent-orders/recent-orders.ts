import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Order } from '../profile-page/profile.service';

@Component({
  selector: 'app-recent-orders',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './recent-orders.html',
  styleUrl: './recent-orders.css',
})
export class RecentOrders {
  @Input() orders: Order[] = [];
}
