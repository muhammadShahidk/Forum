import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, signal } from '@angular/core';
import { PostComponent } from '../Post/Post.component';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { PostResponseDto } from '../../../Modals/Dtos/PostDto';
import { PostService } from '../../../Services/PostService';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, PostComponent, MatIconModule, MatButtonModule],
  templateUrl: './PostList.component.html',
  styleUrl: './PostList.component.css',
})
export class PostListComponent   {
  @Input() posts$?: Promise<PostResponseDto[]>;



}
