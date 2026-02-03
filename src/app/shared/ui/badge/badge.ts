import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

type BadgeVariant = 'neutral' | 'info' | 'success' | 'danger';

@Component({
  selector: 'ui-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './badge.html',
  styleUrls: ['./badge.scss'],
})
export class BadgeComponent {
  @Input() variant: BadgeVariant = 'neutral';

  get klass() {
    return `badge badge--${this.variant}`;
  }
}
