export interface PostResponseDto extends PostRequestDto {
  postID: number;
  UserID: string;
  dateCreated: Date;
  username: string;
  name: string;
}

export interface PostRequestDto {
  title?: string ;
  content?: string ;
}

//  {
//   "postID": 1,
//   "userID": "f4c27e95-0fd1-494c-b46c-7592f1cdf29f",
//   "dateCreated": "2023-12-05T13:00:50.5773622",
//   "title": "very nice post 2 ",
//   "content": "how are you mister shahid"
// }

// postID: number;
// userID: string;
// dateCreated: string;
// username: string;
// name: string;
// title: string;
// content: string;
