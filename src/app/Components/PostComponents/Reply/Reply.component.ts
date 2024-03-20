import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReplyResponseDto } from '../../../Modals/Dtos/ReplyResponseDto';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-reply',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule
  ],
  templateUrl: './Reply.component.html',
  styleUrl: './Reply.component.css',
})
export class ReplyComponent { 
  @Input()
  Reply?: ReplyResponseDto;
  panelOpenState = false;
}
