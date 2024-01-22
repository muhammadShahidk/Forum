import { Injectable } from '@angular/core';
import { ApiRequestService } from './ApiRequest.service';
import { ToastService } from './Utl/Toast.service';
import { HttpClient } from '@angular/common/http';
import { RouteCategories } from '../routes/paths';
import { apiResponce } from '../Modals/Dtos/ApiResponceDto';
import { sensitiveKeywordRequestDto, sensitiveKeywordResponseDto } from '../Modals/Dtos/SensitiveKeywordDto';

@Injectable({
  providedIn: 'root',
})
export class SensitiveKeyWordsService {

  async UpdateKeyword(id:number,keyword: sensitiveKeywordRequestDto) {
    const response = await this.api.handleRequest(
      this.http.put<apiResponce<sensitiveKeywordResponseDto>>(
        `${RouteCategories.SensitiveKeywords.PUT(id)}`,
        keyword
      )
    );

    return response.Data;


  }
  constructor(
    private http: HttpClient,
    private api: ApiRequestService,
    private toast: ToastService
  ) {}
  // get all keyWords
  public async getAllKeyWords(): Promise<sensitiveKeywordResponseDto[]> {
    const response = await this.api.handleRequest(
      this.http.get<apiResponce<sensitiveKeywordResponseDto[]>>(
        `${RouteCategories.SensitiveKeywords.GET_ALL()}`
      )
    );

    return response.Data;
  }

  // add new keyWord
  public async addNewKeyWord(
    keyWord: sensitiveKeywordRequestDto
  ): Promise<any> {
    const response = await this.api.handleRequest(
      this.http.post<apiResponce<sensitiveKeywordResponseDto>>(
        `${RouteCategories.SensitiveKeywords.POST()}`,
        keyWord
      )
    );

    return response.Data;
  }

  // delete keyWord

  public async deleteKeyWord(id: number): Promise<any> {
    const response = await this.api.handleRequest(
      this.http.delete<apiResponce<sensitiveKeywordResponseDto>>(
        `${RouteCategories.SensitiveKeywords.DELETE(id)}`
      )
    );

    return response.Data;
  }
}
