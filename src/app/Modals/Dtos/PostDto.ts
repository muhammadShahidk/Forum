export interface PostResponseDto extends PostRequestDto {
  postID: number;
  UserID: string;
  dateCreated: Date;
}

export interface PostRequestDto {
   title?: string | null;
   content?: string | null;
 }

