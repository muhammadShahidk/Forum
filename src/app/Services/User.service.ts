import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ApiRequestService } from './ApiRequest.service';
import {
  UserResponseDto,
  bandUserStatusResponceDto,
} from '../Modals/Dtos/userDto';
import { RouteCategories } from '../routes/paths';
import { apiResponce } from '../Modals/Dtos/ApiResponceDto';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private router = inject(Router);
  private http = inject(HttpClient);
  private api = inject(ApiRequestService);

  async GetAllUsers(): Promise<UserResponseDto[]> {
    const responce = await this.api.handleRequest(
      this.http.get<apiResponce<UserResponseDto[]>>(
        `${RouteCategories.User.GET_All()}`
      )
    );

    return responce.Data;
  }

  async GetAllUsersWithBandStatus(): Promise<bandUserStatusResponceDto[]> {
    const responce = await this.api.handleRequest(
      this.http.get<apiResponce<bandUserStatusResponceDto[]>>(
        `${RouteCategories.banUser.GET_AllUsersBandStatus()}`
      )
    );

    return responce.Data;
  }
  constructor() {}
}
