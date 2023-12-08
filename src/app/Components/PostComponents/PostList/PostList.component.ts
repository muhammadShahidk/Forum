import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { PostComponent } from '../Post/Post.component';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { PostResponseDto } from '../../../Modals/Dtos/PostDto';
import { PostService } from '../../../Services/PostService';

@Component({
  selector: 'app-post-list-page',
  standalone: true,
  imports: [CommonModule, PostComponent, MatIconModule, MatButtonModule],
  templateUrl: './PostList.component.html',
  styleUrl: './PostList.component.css',
})
export class PostListComponent implements OnInit {
  posts$?: Promise<PostResponseDto[]>;

  getData() {
    this.posts$ = this.postService.getPosts();
  }
  constructor(private postService: PostService) {}
  ngOnInit(): void {
    this.posts$ = this.postService.getPosts();
    console.log('this.posts$');
    console.log(this.posts$);
  }
}
