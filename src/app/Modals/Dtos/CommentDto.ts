import { PostResponseDto } from "./PostDto";

export interface CommentResponceDto {
    commentId: number;
    userID: string;
    dateCreateAt: string;
    username: string;
    name: string;
    content: string;
  }


  export class CommentToPost implements PostResponseDto {
      postID: number;
      UserID: string;
      dateCreated: Date;
      title?: string | null | undefined;
      content?: string | null | undefined;

       constructor(commentResponseDto:CommentResponceDto){
            this.postID = 0;
            this.UserID = commentResponseDto.userID;
            this.dateCreated = new Date(commentResponseDto.dateCreateAt);
            this.title = commentResponseDto.name;
            this.content = commentResponseDto.content;
        }
    //map commentResponseDto to PostResponseDto in constructor

  }
    