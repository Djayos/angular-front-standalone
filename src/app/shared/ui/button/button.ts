import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

type ButtonVariant = 'primary' | 'secondary' | 'danger';

@Component({
  selector: 'ui-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.html',
  styleUrls: ['./button.scss'],
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'secondary';
  @Input() type: 'button' | 'submit' = 'button';
  @Input() disabled = false;

  get klass() {
    return `btn btn--${this.variant}`;
  }
}
