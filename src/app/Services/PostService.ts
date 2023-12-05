import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { RouteCategories } from '../routes/paths';
import { PostResponseDto } from '../Modals/Dtos/PostDto';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

 async  getPosts(): Promise<PostResponseDto[]> {
     const responces =  await firstValueFrom( this.http.get<PostResponseDto[]>(RouteCategories.User.Posts.GET()));
     debugger
    return responces;
  }

  getPost(postId: string): Observable<any> {
    const url = RouteCategories.Posts.GET(postId);
    return this.http.get(url);
  }

  createPost(postData: any): Observable<any> {
    return this.http.post(RouteCategories.User.Posts.POST(), postData);
  }

  updatePost(postId: string, postData: any): Observable<any> {
    const url = RouteCategories.User.Posts.PUT(postId);
    return this.http.put(url, postData);
  }

  deletePost(postId: string): Observable<any> {
    const url = RouteCategories.Posts.DELETE(postId);
    return this.http.delete(url);
  }

  getComments(postId: string): Observable<any> {
    const url = RouteCategories.User.Posts.Comments.GET(postId);
    return this.http.get(url);
  }

  // Add more methods as needed for other API endpoints

  // Example usage:
  // updatePassword(newPassword: string): Observable<any> {
  //   const url = RouteCategories.User.Posts.UpdatePassword.PUT;
  //   return this.http.put(url, { newPassword });
  // }
}
