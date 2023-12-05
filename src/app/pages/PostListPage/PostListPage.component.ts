import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PostComponent } from '../../Components/Post/Post.component';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {  MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { PostResponseDto } from '../../Modals/Dtos/PostDto';
import { PostService } from '../../Services/PostService';


@Component({
  selector: 'app-post-list-page',
  standalone: true,
  imports: [
    CommonModule,
    PostComponent,
    MatIconModule,
    MatButtonModule,
   
  ],
  templateUrl: './PostListPage.component.html',
  styleUrl: './PostListPage.component.css',
})
export class PostListPageComponent {
  posts$?:Promise<PostResponseDto[]> ;

  getData() {
    this.posts$ = this.postService.getPosts();
  }
    constructor (private postService:PostService){}
 }
