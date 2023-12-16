export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
}

export interface forgotPasswordRequestDto {
  email: string;
}

export interface forgotPasswordUpdateDto {
  userId: string;
  token: string;
  newPassword: string;
  confirmPassword: string;
}
