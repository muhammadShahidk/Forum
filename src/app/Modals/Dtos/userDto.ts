export interface UserRequestDto {
  email: string;
  firstName: string;
  lastName: string;
  rools: string[];
  username: string;
}

export interface UserResponseDto extends UserRequestDto {
  userID: number;
}
