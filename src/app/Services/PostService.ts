import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { RouteCategories } from '../routes/paths';
import { PostResponseDto } from '../Modals/Dtos/PostDto';
import { ApiRequestService } from './ApiRequest.service';
import { CommentResponceDto } from '../Modals/Dtos/CommentDto';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient,private api:ApiRequestService) {}

    async getPosts(): Promise<PostResponseDto[]> {
      const responses = await this.api.handleRequest(this.http.get<PostResponseDto[]>(RouteCategories.Posts.GET_All()));
      return responses;
    }

    async getPost(postId: number): Promise<PostResponseDto> {
      const url = RouteCategories.Posts.GET(postId);
      return await this.api.handleRequest(this.http.get<PostResponseDto>(url));
    }

    async createPost(postData: any): Promise<any> {
      return await this.api.handleRequest(this.http.post(RouteCategories.User.Posts.POST(), postData));
    }

    async updatePost(postId: string, postData: any): Promise<any> {
      const url = RouteCategories.User.Posts.PUT(postId);
      return await this.api.handleRequest(this.http.put(url, postData));
    }

    async deletePost(postId: number): Promise<any> {
      const url = RouteCategories.Posts.DELETE(postId);
      return await this.api.handleRequest(this.http.delete(url));
    }

    async getPostComments(postId: number): Promise<CommentResponceDto[]> {
      const url = RouteCategories.Posts.GET_Comments(postId);
      return await this.api.handleRequest(this.http.get<CommentResponceDto[]>(url));
    }

    
    // async getComments(postId: number): Promise<CommentResponceDto[]> {
    //   const url = RouteCategories.User.Posts.Comments.GET(postId);
    //   return await this.api.handleRequest(this.http.get<CommentResponceDto[]>(url));
    // }
  }
