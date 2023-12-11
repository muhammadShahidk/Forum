import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { PATH_AUTH, RouteCategories, _basePath } from '../routes/paths';
import { UserRegisterDto } from '../Modals/Dtos/UserRegisterDto';
import { UserLoginDto } from '../Modals/Dtos/UserLoginDto';
import { Observable, firstValueFrom } from 'rxjs';
import { UserRequestDto, UserResponseDto } from '../Modals/Dtos/userDto';
import { ApiRequestService } from './ApiRequest.service';
import { ApprovalRequestDto, ApprovalResponseDto } from '../Modals/Dtos/ApprovalDto';
import { ApiResponceDto, apiResponce } from '../Modals/Dtos/ApiResponceDto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  Token: string = '';

  constructor(private http: HttpClient,private api:ApiRequestService) {}

  storeToken(token: string): void {

    console.log('token', token);
    localStorage.setItem('token', token);

  }

  // create a method to get the token from local storage
  getToken(): string {
    return localStorage.getItem('token') || '';
  }



  // register method
  async Register(user: UserRegisterDto): Promise<any> {
    return this.api.handleRequest<any>(
      this.http.post(`${_basePath}/${PATH_AUTH.register}`, user)
    );
  }

  // login method
  async Login(user: UserLoginDto): Promise<any> {
    try {
      const response = await this.api.handleRequest<apiResponce<loginResponse>>(
        this.http.post<apiResponce<loginResponse>>(
          `${_basePath}/${PATH_AUTH.login}`,
          user
        )
      );

      console.log(response.Success);
      if (response.Success) {
        console.log("setting the token");
        this.storeToken(response.Data.message);
      } else {
        console.log(response.Data.message);
        throw new Error(response.Data.message);
      }

      return response;
    } catch (error) {
      console.log(error);
      const ErrorResult = (error as any).error as ApiResponceDto;
      // console.error('An error occurred:', ErrorResult.message);
      // if(ErrorResult.Data?.message){
      //   throw new Error(`${ErrorResult.Data?.message}`);

      // }
      // else{
      //   console.log("trace 1");
      //   console.log(error);

      //   throw new Error(`${error}`);
      // }
      console.log((error as any).error);
    }
  }

  // make approval request
  async MakeApprovalRequest(request:ApprovalRequestDto): Promise<ApprovalResponseDto> {
    return this.api.handleRequest(
      this.http.post<ApprovalResponseDto>(RouteCategories.ApprovalRequests.POST(), request)
    );
  }

  //get user details
  async getUserDetails(): Promise<UserResponseDto> {
    try {
      const response = await this.api.handleRequest(
        this.http.get<apiResponce<UserResponseDto>>(
          `${RouteCategories.User.GET()}`
        )
      );
      return response.Data;
    } catch (error) {
      console.error(error);
      throw new Error(`${(error as any).error}`);
    }
  }


}



interface loginResponse {
  isSucceed:boolean;
  message:string;
}
