import { CommonModule } from '@angular/common';
import { Component, Input, computed, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-post-header',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule
  ],
  templateUrl: './PostHeader.component.html',
  styleUrl: './PostHeader.component.css',
})
export class PostHeaderComponent {
  @Input()
  user: string = 'User';
  @Input()
  title: string = 'Title';

  @Input() isComment = false;

  @Input()
  date? = signal<Date>(new Date());



  CreatedOn = computed(() => this.createdOn());

  createdOn = () => {
    if(this.date === undefined){
      console.log("date is undefined");
      return '';

    }
    // console.log(this.date());
    // console.log("calculating date");
    if(this.date() === undefined){
      return '';

    }
    else{
      if (this.date()) {
        const currentDate = new Date();
        const oldDate = new Date(this.date());
        const diffInMinutes = Math.floor((currentDate.getTime() - oldDate.getTime()) / (1000 * 60));
        if (diffInMinutes < 60) {
          return `${diffInMinutes} minutes ago`;
        } else if (diffInMinutes < 1440) {
          const diffInHours = Math.floor(diffInMinutes / 60);
          return `${diffInHours} hours ago`;
        } else {
          const diffInDays = Math.floor(diffInMinutes / 1440);
          return `${diffInDays} days ago`;
        }
      }
    }
   
    return '';
  }
}
