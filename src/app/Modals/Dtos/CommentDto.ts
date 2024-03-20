import { PostResponseDto } from "./PostDto";

export interface CommentResponceDto {
    commentId: number;
    userID: string;
    dateCreateAt: Date;
    username: string;
    name: string;
    content: string;
  }


  export class CommentToPost implements PostResponseDto {
      postID: number;
      UserID: string;
      dateCreated: Date;
 

       constructor(commentResponseDto:CommentResponceDto){
            this.postID = commentResponseDto.commentId;
            this.UserID = commentResponseDto.userID;
            this.dateCreated = new Date(commentResponseDto.dateCreateAt);
            this.title = commentResponseDto.content;
            this.content = commentResponseDto.content;
            this.username = commentResponseDto.username;
            this.name = commentResponseDto.name;
        }
      username: string;
      name: string;
      title?: string | undefined;
      content?: string | undefined;
 
    //map commentResponseDto to PostResponseDto in constructor

  }
    

  export interface CommentRequestDto {
    content: string;
  }