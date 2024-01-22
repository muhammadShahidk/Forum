import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { RouteCategories } from '../routes/paths';
import { PostResponseDto } from '../Modals/Dtos/PostDto';
import { ApiRequestService } from './ApiRequest.service';
import {
  CommentRequestDto,
  CommentResponceDto,
} from '../Modals/Dtos/CommentDto';
import { apiResponce } from '../Modals/Dtos/ApiResponceDto';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  async getUserPosts(): Promise<PostResponseDto[]> {
    const responses = await this.api.handleRequest(
      this.http.get<apiResponce<PostResponseDto[]>>(
        RouteCategories.User.Posts.GET()
      )
    );
    return responses.Data.sort((a, b) => {
      return Number(new Date(b.dateCreated)) - Number(new Date(a.dateCreated));
    });
  }

  constructor(private http: HttpClient, private api: ApiRequestService) {}

  async getPosts(): Promise<PostResponseDto[]> {
    const responses = await this.api.handleRequest(
      this.http.get<apiResponce<PostResponseDto[]>>(
        RouteCategories.Posts.GET_All()
      )
    );
    return responses.Data.sort((a, b) => {
      return Number(new Date(b.dateCreated)) - Number(new Date(a.dateCreated));
    });
  }

  async getPost(postId: number): Promise<PostResponseDto> {
    const url = RouteCategories.Posts.GET(postId);
    const responce = await this.api.handleRequest(
      this.http.get<apiResponce<PostResponseDto>>(url)
    );
    return responce.Data;
  }

  async createPost(postData: any): Promise<any> {
    return await this.api.handleRequest(
      this.http.post(RouteCategories.User.Posts.POST(), postData)
    );
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
    const comments = await this.api.handleRequest(
      this.http.get<apiResponce<CommentResponceDto[]>>(url)
    );
    return comments.Data.sort((a, b) => {
      return (
        Number(new Date(b.dateCreateAt)) - Number(new Date(a.dateCreateAt))
      );
    });
  }

  // add comment to post
  async addCommentToPost(
    postId: number,
    comment: CommentRequestDto
  ): Promise<any> {
    const url = RouteCategories.User.Posts.Comments.POST(postId);
    return await this.api.handleRequest(this.http.post(url, comment));
  }

  public OnPostDelete: EventEmitter<any> = new EventEmitter();

  //sort array
}
