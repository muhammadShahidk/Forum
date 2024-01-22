import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PostRequestDto } from '../../Modals/Dtos/PostDto';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { PostService } from '../../Services/PostService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-post-page',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './NewPostPage.component.html',
  styleUrl: './NewPostPage.component.css',
})
export class NewPostPageComponent {
  async Submit() {
    console.log(this.newPostForm.value);
    await this.postService.createPost(this.newPostForm.value);
    this.router.navigate(['/']);
  }
  newPost: PostRequestDto = { title: '', content: '' };
  newPostForm = this.fb.group({
    title: [''],
    content: [''],
  });

  constructor(private router:Router, private fb: FormBuilder, private postService: PostService) {}
}
