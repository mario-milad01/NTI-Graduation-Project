import { Component } from '@angular/core';

interface Order {
  product: string;
  variant: string;
  orderId: string;
  status: 'In Transit' | 'Delivered';
  total: string;
}

@Component({
  selector: 'app-recent-orders',
  standalone: true,
  imports: [],
  templateUrl: './recent-orders.html',
  styleUrl: './recent-orders.css',
})
export class RecentOrders {
  orders: Order[] = [
    { product: 'Premium Leather Tote', variant: 'Black / Medium', orderId: '#LX-99201', status: 'In Transit', total: '$299.00' },
    { product: 'Heritage Low-Top', variant: 'White / 42', orderId: '#LX-98443', status: 'Delivered', total: '$185.00' },
    { product: 'Chronos Series 3', variant: 'Space Grey / 40mm', orderId: '#LX-97002', status: 'Delivered', total: '$450.00' },
  ];
}
