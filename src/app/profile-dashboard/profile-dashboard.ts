import { Component } from '@angular/core';
import { StatCard } from '../stat-card/stat-card';
import { RecentOrders } from '../recent-orders/recent-orders';

@Component({
  selector: 'app-profile-dashboard',
  standalone: true,
  imports: [StatCard, RecentOrders],
  templateUrl: './profile-dashboard.html',
  styleUrl: './profile-dashboard.css',
})
export class ProfileDashboard {}