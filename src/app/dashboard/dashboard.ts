import { Component } from '@angular/core';
import { Sidebar } from '../sidebar/sidebar';
import { StatCard } from '../stat-card/stat-card';
import { RecentOrders } from '../recent-orders/recent-orders';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [Sidebar, StatCard, RecentOrders],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {}
