import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostListComponent } from '../../Components/PostComponents/PostList/PostList.component';
import { PostResponseDto } from '../../Modals/Dtos/PostDto';
import { PostService } from '../../Services/PostService';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule, PostListComponent],
  templateUrl: './PostsPage.component.html',
  styleUrl: './PostsPage.component.css',
})
export class PostsComponent implements OnInit, OnDestroy {
  posts$?: Promise<PostResponseDto[]>;
  private OnPostDeleteSubscription!: Subscription;

  constructor(private postService: PostService) {
    this.OnPostDeleteSubscription =
      this.postService.OnPostDelete.subscribe((data) => {
        console.log('OnPostDeleteSubscription');
        console.log(data);
        this.initilize();
      });
  }
  ngOnDestroy(): void {
    this.OnPostDeleteSubscription.unsubscribe();
  }
  ngOnInit(): void {
    this.initilize();
  }

  private initilize() {
    this.posts$ = this.postService.getPosts();
    console.log('this.posts$');
    console.log(this.posts$);
  }
}
