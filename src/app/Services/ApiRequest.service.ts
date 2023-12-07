import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiRequestService {

  constructor() { }

  // create a Generic method to handle API requests with expception handling and printing the response with status code to the console
  async handleRequest<T>(request: Observable<T>): Promise<T> {
    try {
      const response = await firstValueFrom(request);
      
      console.info("handle request response");
      console.log(response);
      // print the T type name
      return response;
      
    } catch (error) {
      
      console.error(error);
      
      // the status code is 
      const status = (error as any).status;
      if(status){
        console.log(`status code: ${status} ${this.getStatusCodeMessage(status)}`);
      }

      throw new Error(`${(error as any).error}`);

    }
  }

  //create a method to return the status code corresponding string message
  getStatusCodeMessage(statusCode:number):string{
    switch(statusCode){
      case 200:
        return "OK";
      case 201:
        return "Created";
      case 204:
        return "No Content";
      case 400:
        return "Bad Request";
      case 401:
        return "Unauthorized";
      case 403:
        return "Forbidden";
      case 404:
        return "Not Found";
      case 500:
        return "Internal Server Error";
      default:
        return "Unknown";
    }
  }
  

}
