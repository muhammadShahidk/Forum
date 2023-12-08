import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PostListComponent } from '../../Components/PostComponents/PostList/PostList.component';
import { PostResponseDto } from '../../Modals/Dtos/PostDto';
import { PostService } from '../../Services/PostService';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule, PostListComponent],
  templateUrl: './PostsPage.component.html',
  styleUrl: './PostsPage.component.css',
})
export class PostsComponent implements OnInit {
  posts$?: Promise<PostResponseDto[]>;
  constructor(private postService: PostService) {}
  ngOnInit(): void {
    this.posts$ = this.postService.getPosts();
    console.log('this.posts$');
    console.log(this.posts$);
  }
}
