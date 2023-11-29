import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-post-edit',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './PostEdit.component.html',
  styleUrl: './PostEdit.component.css',
})
export class PostEditComponent { }
