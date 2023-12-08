import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './Posts.component.html',
  styleUrl: './Posts.component.css',
})
export class PostsComponent { }
