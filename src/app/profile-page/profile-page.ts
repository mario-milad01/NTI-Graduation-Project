import { Component } from '@angular/core';
import { Sidebar } from '../sidebar/sidebar';
import { StatCard } from '../stat-card/stat-card';
import { RecentOrders } from '../recent-orders/recent-orders';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [Sidebar, StatCard, RecentOrders],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.css',
})
export class ProfilePage {}
