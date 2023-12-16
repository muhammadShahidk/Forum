import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './AlertBox.component.html',
  styleUrl: './AlertBox.component.css',
})
export class AlertBoxComponent {
  @Input() heading: string = 'heading';
  @Input() message: string = 'message';
  isShowing: boolean = true;
  constructor() {
    // close alert after 3 seconds
    setTimeout(() => {
      this.CloseAlert();
    }, 3000);
  }

  CloseAlert() {
    this.isShowing = false;
  }
}
