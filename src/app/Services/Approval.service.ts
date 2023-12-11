import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiRequestService } from './ApiRequest.service';
import { RouteCategories } from '../routes/paths';
import { apiResponce } from '../Modals/Dtos/ApiResponceDto';
import { ApprovalRequestDto, ApprovalResponseDto, ChangeApprovalStatusDto } from '../Modals/Dtos/ApprovalDto';

@Injectable({
  providedIn: 'root',
})
export class ApprovalService {
  SetStatus(changeStatus:ChangeApprovalStatusDto) {
    const url = RouteCategories.ApprovalRequests.PUT();
    return this.api.handleRequest(this.http.put(url, changeStatus));
  }
  constructor(private http: HttpClient, private api: ApiRequestService) {}

  // Add methods for approval-related functionality here

  // Example method:
  async getAllRequest(): Promise<ApprovalResponseDto[]> {
    const url = RouteCategories.ApprovalRequests.GET_ALL();
    const responce = await this.api.handleRequest(
      this.http.get<apiResponce<ApprovalResponseDto[]>>(url)
    );

    return responce.Data;
  }
}
