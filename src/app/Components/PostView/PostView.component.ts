import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-post-view',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './PostView.component.html',
  styleUrl: './PostView.component.css',
})
export class PostViewComponent { }
