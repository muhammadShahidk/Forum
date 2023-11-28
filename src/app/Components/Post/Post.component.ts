import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './Post.component.html',
  styleUrl: './Post.component.css',
})
export class PostComponent {
  title:string = "What do you think about manshera"
  user:string ="shahid"
 }
