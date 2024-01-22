export interface UserRequestDto {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
}

export interface UserResponseDto extends UserRequestDto {
  userID: number;
  rools: string[];
}

export interface UserRolResponceDto {
  name: string;
  userName: string;
  password: string;
  rools: string[];
}

export interface UseRooleRequestDto {
  userName: string;
}

export  interface UpdateUserInfoDto
{
  firstName: string,
  lastName: string,
  email: string
}


export interface bandUserStatusResponceDto {
  userId: string;
  userName: string;
  status: number;
}
