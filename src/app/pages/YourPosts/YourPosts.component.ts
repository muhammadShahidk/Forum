import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PostResponseDto } from '../../Modals/Dtos/PostDto';
import { PostService } from '../../Services/PostService';
import { PostListComponent } from '../../Components/PostComponents/PostList/PostList.component';

@Component({
  selector: 'app-your-posts',
  standalone: true,
  imports: [CommonModule, PostListComponent],
  templateUrl: './YourPosts.component.html',
  styleUrl: './YourPosts.component.css',
})
export class YourPostsComponent implements OnInit {

  posts$?: Promise<PostResponseDto[]>;


  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.posts$ = this.postService.getUserPosts();
    console.log('this.posts$');
    console.log(this.posts$);
  }
}
