export interface UserRequestDto {
  FirstName: string;
  LastName: string;
  Username: string;
  Rools: string[];
  Email: string;
}

export interface UserResponseDto extends UserRequestDto {
  UserID: number;
}
