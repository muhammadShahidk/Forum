import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiRequestService } from './ApiRequest.service';
import { BannedUserResponceDTO } from '../Modals/Dtos/BandUserDto';
import { RouteCategories } from '../routes/paths';
import { apiResponce } from '../Modals/Dtos/ApiResponceDto';

@Injectable({
  providedIn: 'root',
})
export class BannedUsersService {
  constructor(
    private router: Router,
    private http: HttpClient,
    private api: ApiRequestService
  ) {}

  async GetAllBannedUsers(): Promise<BannedUserResponceDTO[]> {
    const response = await this.api.handleRequest(
      this.http.get<apiResponce<BannedUserResponceDTO[]>>(
        `${RouteCategories.banUser.GET()}`
      )
    );
    return response.Data;
  }
}
