export interface PostResponseDto extends PostRequestDto {
  postID: number;
  UserID: string;
  dateCreated: Date;
}

export interface PostRequestDto {
   title?: string | null;
   content?: string | null;
 }


//  {
//   "postID": 1,
//   "userID": "f4c27e95-0fd1-494c-b46c-7592f1cdf29f",
//   "dateCreated": "2023-12-05T13:00:50.5773622",
//   "title": "very nice post 2 ",
//   "content": "how are you mister shahid"
// }