export interface PostResponseDto extends PostRequestDto {
   PostID: number;
   UserID: string;
 }
 
export interface PostRequestDto {
   Title?: string | null;
   Content?: string | null;
 }
 
