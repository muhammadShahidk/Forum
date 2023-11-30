import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-post-header',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './PostHeader.component.html',
  styleUrl: './PostHeader.component.css',
})
export class PostHeaderComponent {
  @Input()
  user: string = 'User';
  @Input()
  title: string = 'Title';
}
