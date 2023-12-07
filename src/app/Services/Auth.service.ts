import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { PATH_AUTH, RouteCategories, _basePath } from '../routes/paths';
import { UserRegisterDto } from '../Modals/Dtos/UserRegisterDto';
import { UserLoginDto } from '../Modals/Dtos/UserLoginDto';
import { Observable, firstValueFrom } from 'rxjs';
import { UserRequestDto, UserResponseDto } from '../Modals/Dtos/userDto';
import { ApiRequestService } from './ApiRequest.service';
import { ApprovalRequestDto, ApprovalResponseDto } from '../Modals/Dtos/ApprovalDto';

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

  // create a method to handle API requests
    private async handleRequest<T>(request: Observable<T>): Promise<T> {
      try {
        const response = await firstValueFrom(request);
        console.log(response);
        return response;
      } catch (error) {
        debugger
        console.error(error);
        throw new Error(`${(error as any).error}`);
      }
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
      const response = await this.api.handleRequest<loginResponse>(
        this.http.post<loginResponse>(`${_basePath}/${PATH_AUTH.login}`, user)
      );

      console.log(response.isSucceed);
      if (response.isSucceed) {
        console.log("setting the token");
        this.storeToken(response.message);
      } else {
        console.log(response.message);
        throw new Error(response.message);
      }

      return response;
    } catch (error) {
      debugger
      console.log(error);
      const ErrorResult = (error as any).error as loginResponse;
      // console.error('An error occurred:', ErrorResult.message);
      debugger
      if(ErrorResult){
        throw new Error(`${ErrorResult}`);

      }
      else{
        console.log("trace 1");
        console.log(error);

        throw new Error(`${error}`);
      }
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
      const response = await this.api.handleRequest<UserResponseDto>(
        this.http.get<UserResponseDto>(`${RouteCategories.User.GET()}`)
      );
      return response;
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
