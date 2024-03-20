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
import { AuthService } from '../../../Services/Auth.service';
import { PostService } from '../../../Services/PostService';
import { RepliesService } from '../../../Services/RepliesService';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ReplyResponseDto } from '../../../Modals/Dtos/ReplyResponseDto';
import { ReplyComponent } from '../Reply/Reply.component';
import {MatExpansionModule} from '@angular/material/expansion';
@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule,
    MatInputModule,
    ReplyComponent,
    MatExpansionModule,
    FormsModule,

    PostHeaderComponent,
  ],
  templateUrl: './Post.component.html',
  styleUrl: './Post.component.css',
})
export class PostComponent implements OnChanges {
  panelOpenState = false;
  Replies: ReplyResponseDto[] = [];
  async AddReply() {
    console.log('adding reply', this.ReplyValue);
    await this.replyService.addReply(this.post?.postID ?? 1, {
      content: this.ReplyValue,
    });
    await this.getCommentsReplies();
    this.ReplyValue = '';
    console.log(this.post);
  }
  ReplyValue: string = '';
  Reply() {
    this.ShowReplyBox?.set(true);
    // this.replyService.addReply(this.post?.postID??1,{content:"smaple"})
  }
  async DeletePost() {
    const postID = this.post?.postID ?? 0;
    try {
      await this.postService.deletePost(postID);
      this.postService.OnPostDelete.emit(postID);
    } catch (e) {
      console.log(e);
    }
  }
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postService: PostService,
    private replyService: RepliesService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['post']) {
      // console.log('post changed');
      if (this.post?.dateCreated !== undefined) {
        this.date?.set(this.post?.dateCreated);
      }

      if (this.isComment) {
        this.getCommentsReplies();
      }
    }
  }

  async getCommentsReplies() {
    let Replies = await this.replyService.getCommentsReply(
      this.post?.postID ?? 0
    );
    this.Replies = Replies
    // Replies.forEach(item=>this.Replies.push(item))
  }
  // ...
  @Input()
  post?: PostResponseDto;
  @Input()
  isModerator = false;

  ViewDetails() {
    console.log('activated route' + this.route);
    this.router.navigate(['PostDetails', this.post?.postID], {
      relativeTo: this.route.parent,
    });
  }

  @Input() isComment: boolean = false;
  @Input() isPostView: boolean = false;
  date? = signal<Date>(new Date());
  ShowReplyBox = signal<boolean>(false);

  title: string = 'What do you think about manshera';
  user: string = 'shahid';

  IconStyles = 'text-md text-gray-500';

  Content = `The Shiba Inu is the smallest of the six original and distinct spitz
  breeds of dog from Japan. A small, agile dog that copes very well with
  mountainous terrain, the Shiba Inu was originally bred for hunting.`;
}
