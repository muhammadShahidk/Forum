import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';
import { PostTailwindcssComponent } from '../PostTailwindcss/PostTailwindcss.component';
@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule,
    PostTailwindcssComponent
  ],
  templateUrl: './Post.component.html',
  styleUrl: './Post.component.css',
})
export class PostComponent {
  title:string = "What do you think about manshera"
  user:string ="shahid"

  IconStyles ="text-md text-gray-500"

  Content = `The Shiba Inu is the smallest of the six original and distinct spitz
  breeds of dog from Japan. A small, agile dog that copes very well with
  mountainous terrain, the Shiba Inu was originally bred for hunting.`
 }
