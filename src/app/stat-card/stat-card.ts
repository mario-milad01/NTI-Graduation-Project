import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stat-card',
  imports: [],
  templateUrl: './stat-card.html',
  styleUrl: './stat-card.css',
})
export class StatCard {
  @Input() label = '';
  @Input() value = '';
  @Input() linkText = '';
  @Input() linkColor: 'blue' | 'gold' = 'blue';
}
