import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-new-post-page',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './NewPostPage.component.html',
  styleUrl: './NewPostPage.component.css',
})
export class NewPostPageComponent { }
