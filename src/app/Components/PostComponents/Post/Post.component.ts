import { CommonModule } from '@angular/common';
import {
  Component,
  Inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { PostTailwindcssComponent } from '../../PostTailwindcss/PostTailwindcss.component';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { PostHeaderComponent } from '../PostHeader/PostHeader.component';
import { PostRequestDto, PostResponseDto } from '../../../Modals/Dtos/PostDto';
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
export class PostComponent implements OnChanges {
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['post']) {
      // console.log('post changed');
      if (this.post?.dateCreated !== undefined) {
        this.date?.set(this.post?.dateCreated);
      }
    }
  }

  // ...
  @Input()
  post?: PostResponseDto;

  ViewDetails() {
    console.log('activated route' + this.route);
    this.router.navigate(['PostDetails', this.post?.postID], {
      relativeTo: this.route.parent,
    });
  }


  @Input() isComment:boolean = false;
  @Input() isPostView:boolean = false;
  date? = signal<Date>(new Date());

  title: string = 'What do you think about manshera';
  user: string = 'shahid';

  IconStyles = 'text-md text-gray-500';

  Content = `The Shiba Inu is the smallest of the six original and distinct spitz
  breeds of dog from Japan. A small, agile dog that copes very well with
  mountainous terrain, the Shiba Inu was originally bred for hunting.`;
}
