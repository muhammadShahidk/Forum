import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
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

@Component({
  selector: 'app-post-view',
  standalone: true,
  imports: [
    CommonModule,
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
export class PostViewComponent {
getData() {
  this.posts$ = this.postService.getPosts();
}
  constructor (private postService:PostService){}
  
  value = "";
  Data$?:string; 
  posts$?:Promise<PostResponseDto[]> ;
  // set id(heroId: string) {
    //   this.Data$ = this.service.getHero(heroId);
    // 
@Input()
set id(postId: string) {
  console.log
  this.Data$ = ["one","two","three","four","five","six","seven","eight","nine","ten"].at(Number.parseInt(postId));
}
}
