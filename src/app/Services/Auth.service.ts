import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { PATH_AUTH, RouteCategories, _basePath } from '../routes/paths';
import { UserRegisterDto } from '../Modals/Dtos/UserRegisterDto';
import { UserLoginDto } from '../Modals/Dtos/UserLoginDto';
import { Observable, firstValueFrom } from 'rxjs';
import { UserRequestDto, UserResponseDto } from '../Modals/Dtos/userDto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  Token: string = '';

  constructor(private htpp: HttpClient) {}

  // create a method to store the token in local storage
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
    return this.handleRequest<any>(
      this.htpp.post(`${_basePath}/${PATH_AUTH.register}`, user)
    );
  }

  // login method
  async Login(user: UserLoginDto): Promise<any> {
    try {
      const response = await this.handleRequest<loginResponse>(
        this.htpp.post<loginResponse>(`${_basePath}/${PATH_AUTH.login}`, user)
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

  //get user details
  async getUserDetails(): Promise<UserResponseDto> {
    var response  = await this.handleRequest<UserResponseDto>(
      this.htpp.get(`${RouteCategories.User.GET()}`)
    );
    
    return response;
  }


}



interface loginResponse {
  isSucceed:boolean;
  message:string;
}
