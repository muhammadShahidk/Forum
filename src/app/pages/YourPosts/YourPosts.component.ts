import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-your-posts',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './YourPosts.component.html',
  styleUrl: './YourPosts.component.css',
})
export class YourPostsComponent {

}
