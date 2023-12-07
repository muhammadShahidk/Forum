import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { PostHeaderComponent } from '../PostComponents/PostHeader/PostHeader.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { PostComponent } from '../Post/Post.component';
import { PostService } from '../../Services/PostService';
import { PostResponseDto } from '../../Modals/Dtos/PostDto';
import {
  CommentResponceDto,
  CommentToPost,
} from '../../Modals/Dtos/CommentDto';

@Component({
  selector: 'app-post-view',
  standalone: true,
  imports: [
    CommonModule,
    PostComponent,
    PostHeaderComponent,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    PostComponent,
  ],
  templateUrl: './PostView.component.html',
  styleUrl: './PostView.component.css',
})
export class PostViewComponent implements OnInit {
  async CreateNewComment() {
    console.log('CreateNewComment');
    await this.postService.addCommentToPost(this.postId$,{content:this.value});
    
    // getting latest comments
    const comments = await this.postService.getPostComments(this.postId$);
    this.commentsToPost$ = comments.map(
      (comment) => new CommentToPost(comment)
    );
    this.value = '';
  }


  postId$: number = 0;

  async getPost(postId: number) {
    return await this.postService.getPost(postId);
  }

  constructor(private postService: PostService) {}
  async ngOnInit(): Promise<void> {
    const post = await this.getPost(this.postId$);
    const comments = await this.postService.getPostComments(this.postId$);

    this.comments$ = comments;
    this.commentsToPost$ = comments.map(
      (comment) => new CommentToPost(comment)
    );
    console.log('commentsToPost$');
    console.log(this.commentsToPost$);

    this.post$ = post; // Fix: Assign the 'post' value to 'this.post$'
    console.log('current post');
    this.title = post?.title ?? '';
    this.dateCreated = signal(post?.dateCreated ?? '');

    console.log('current post ');
    console.log(this.post$);
  }

  value = '';
  title = 'title';
  username = 'username';
  dateCreated = signal(new Date());

  Data$?: Date;
  comments$?: CommentResponceDto[];
  commentsToPost$?: PostResponseDto[];
  post$?: PostResponseDto;
  // set id(heroId: string) {
  //   this.Data$ = this.service.getHero(heroId);
  //

  @Input()
  set id(postId: string) {
    this.postId$ = postId as unknown as number;
    // this.Data$ = this.service.getHero(heroId);
  }
}
