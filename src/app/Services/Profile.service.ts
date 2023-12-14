import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiRequestService } from './ApiRequest.service';
import { UpdateUserInfoDto } from '../Modals/Dtos/userDto';
import { RouteCategories } from '../routes/paths';
import { ChangePasswordDto } from '../Modals/Dtos/PasswordDto';

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
  async UpdateUserInfo(user: UpdateUserInfoDto): Promise<any> {
    return this.api.handleRequest<any>(
      this.http.put(`${RouteCategories.Profile.PUT()}`, user)
    );
  }

  constructor(private http: HttpClient, private api: ApiRequestService) {}
}
