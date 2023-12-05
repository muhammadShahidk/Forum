import { CommonModule } from '@angular/common';
import { Component, Inject, Input } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';
import { PostTailwindcssComponent } from '../PostTailwindcss/PostTailwindcss.component';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { PostHeaderComponent } from '../PostComponents/PostHeader/PostHeader.component';
import { PostRequestDto, PostResponseDto } from '../../Modals/Dtos/PostDto';
@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule,
    PostHeaderComponent,
  ],
  templateUrl: './Post.component.html',
  styleUrl: './Post.component.css',
})

export class PostComponent {
  constructor (private router: Router,private route:ActivatedRoute){}

// ...
@Input()
post?:PostResponseDto


ViewDetails() {
  const postId = Math.floor(Math.random() * 10) + 1;
  console.log("activated route" + this.route)
  this.router.navigate(['PostDetails', postId],{ relativeTo: this.route.parent });
}
  title:string = "What do you think about manshera"
  user:string ="shahid"

  IconStyles ="text-md text-gray-500"

  Content = `The Shiba Inu is the smallest of the six original and distinct spitz
  breeds of dog from Japan. A small, agile dog that copes very well with
  mountainous terrain, the Shiba Inu was originally bred for hunting.`
 }
