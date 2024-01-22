import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiRequestService } from './ApiRequest.service';
import { UpdateUserInfoDto } from '../Modals/Dtos/userDto';
import { RouteCategories } from '../routes/paths';
import {
  ChangePasswordDto,
  forgotPasswordRequestDto,
  forgotPasswordUpdateDto,
} from '../Modals/Dtos/PasswordDto';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  async ChangePassword(passwordDetails: ChangePasswordDto): Promise<any> {
    return this.api.handleRequest<any>(
      this.http.put(
        `${RouteCategories.Profile.password.UpdatePassword.PUT()}`,
        passwordDetails
      )
    );
  }

  // forgot password method
  async ForgotPasswordRequest(
    ForgotPasswordRequest: forgotPasswordRequestDto
  ): Promise<any> {
    return this.api.handleRequest<any>(
      this.http.post(
        `${RouteCategories.Profile.password.ForgotPassword.GET()}`,
        ForgotPasswordRequest
      )
    );
  }

  // forgot password update method
  async ForgotPasswordUpdate(
    ForgotPasswordUpdate: forgotPasswordUpdateDto
  ): Promise<any> {
    return this.api.handleRequest<any>(
      this.http.put(
        `${RouteCategories.Profile.password.ForgotPassword.PUT()}`,
        ForgotPasswordUpdate
      )
    );
  }

  async UpdateUserInfo(user: UpdateUserInfoDto): Promise<any> {
    return this.api.handleRequest<any>(
      this.http.put(`${RouteCategories.Profile.PUT()}`, user)
    );
  }

  constructor(private http: HttpClient, private api: ApiRequestService) {}
}
