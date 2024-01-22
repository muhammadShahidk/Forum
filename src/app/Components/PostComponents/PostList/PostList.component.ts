import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, signal } from '@angular/core';
import { PostComponent } from '../Post/Post.component';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { PostResponseDto } from '../../../Modals/Dtos/PostDto';
import { PostService } from '../../../Services/PostService';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../Services/Auth.service';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    PostComponent,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './PostList.component.html',
  styleUrl: './PostList.component.css',
})
export class PostListComponent implements OnInit {
  @Input() posts$?: Promise<PostResponseDto[]>;
  isModerator = false;

  constructor(private AuthService: AuthService) {
  }
  ngOnInit(): void {
    this.CheckIfModerator();
  }

  async CheckIfModerator() {
    const user = await this.AuthService.getUserDetails();
    this.isModerator = user.rools.includes('MODERATOR');
    console.log('isModerator: ' + this.isModerator )
    console.log('user: ' + user.rools)
  }
}
