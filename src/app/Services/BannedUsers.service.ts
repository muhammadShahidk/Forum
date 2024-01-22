import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiRequestService } from './ApiRequest.service';
import {
  BannedUserRequestDTO,
  BannedUserResponceDTO,
  bandUserStatus,
} from '../Modals/Dtos/BandUserDto';
import { RouteCategories } from '../routes/paths';
import { apiResponce } from '../Modals/Dtos/ApiResponceDto';
import { bandUserStatusResponceDto } from '../Modals/Dtos/userDto';

@Injectable({
  providedIn: 'root',
})
export class BannedUsersService {
  constructor(
    private router: Router,
    private http: HttpClient,
    private api: ApiRequestService
  ) {}

  async GetAllBannedUsers(): Promise<bandUserStatus[]> {
    const response = await this.api.handleRequest(
      this.http.get<apiResponce<bandUserStatus[]>>(
        `${RouteCategories.banUser.GET_AllUsersBandStatus()}`
      )
    );

    return response.Data;
  }

  async GetBannedUserHistory(userId: string): Promise<BannedUserResponceDTO[]> {
    const response = await this.api.handleRequest(
      this.http.get<apiResponce<BannedUserResponceDTO[]>>(
        `${RouteCategories.banUser.GET_history(userId)}`
      )
    );

    return response.Data;
  }

  async BanUser(
    BanRequest: BannedUserRequestDTO
  ): Promise<BannedUserResponceDTO[]> {
    const response = await this.api.handleRequest(
      this.http.post<apiResponce<BannedUserResponceDTO[]>>(
        `${RouteCategories.banUser.POST()}`,
        BanRequest
      )
    );

    return response.Data;
  }

  async UnBanUser(
    userId: string
  ): Promise<BannedUserResponceDTO[]> {
    const response = await this.api.handleRequest(
      this.http.put<apiResponce<BannedUserResponceDTO[]>>(
        `${RouteCategories.banUser.PUT()}`,
        {userId: userId}
      )
    );

    return response.Data;
  }
}
