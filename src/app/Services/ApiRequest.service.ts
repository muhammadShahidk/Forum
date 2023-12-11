import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { ApiResponceDto } from '../Modals/Dtos/ApiResponceDto';
import { PostResponseDto } from '../Modals/Dtos/PostDto';
import { ToastService } from './Utl/Toast.service';

@Injectable({
  providedIn: 'root',
})
export class ApiRequestService {
  constructor(private toast: ToastService) {}

  // create a Generic method to handle API requests with expception handling and printing the response with status code to the console
  async handleRequest<T>(request: Observable<T>): Promise<T> {
    try {
      const response = await firstValueFrom(request);

      console.info('%c handle request response', 'color: blue');
      const { Status, Data } = response as ApiResponceDto;
      console.log(Status);
      console.log(Data);
      // print the T type name
      return response;
    } catch (error) {
      // console.error(error);
      console.log('%c shahid', 'color: red');

      // the status code is
      console.log(error);

      const { Status, Data } = (error as any).error as ApiResponceDto;
      if (Status) {
        console.log(
          `status code: ${Status} ${this.getStatusCodeMessage(Status)}`
        );

        // show the toast message
        this.toast.message.set(
          this.getStatusCodeMessage(Status) +
            ' ' +
            (Data == null ? '' : Data?.message)
        );
        this.toast.isOpen.set(true);
      }

      // if api is not online then retun the error message
      if (!Status) {
        const { message } = error as any;
        console.log(message);
        this.toast.message.set("api is not online");
        this.toast.isOpen.set(true);
      }
      // console.log(`error message: ${(error as ApiResponceDto).Data.message}`);
      // the error message is
      throw new Error(`request failed`, { cause: error });
    }
  }

  //create a method to return the status code corresponding string message
  getStatusCodeMessage(statusCode: number): string {
    switch (Number(statusCode)) {
      case 200:
        return 'OK';
      case 201:
        return 'Created';
      case 204:
        return 'No Content';
      case 400:
        return 'Bad Request';
      case 401:
        return 'Unauthorized';
      case 403:
        return 'Forbidden';
      case 404:
        return 'Not Found';
      case 500:
        return 'Internal Server Error';
      default:
        return 'Unknown';
    }
  }
}
