import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ApiService } from 'src/app/common/services/api.service';
import { AuthenticationService } from 'src/app/common/services/auth.service';
import { LocalService } from 'src/app/common/services/local.service';
// import any from '../model/category.model';
import { environment } from 'src/environments/environment';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({ providedIn: 'root' })
export class PostService {
  public currentUser: any;

  constructor(
    private apiService: ApiService,
    private localStorage: LocalService,
    private auth: AuthenticationService,
    private notification: NzNotificationService
  ) {}

  createCategory(data: any) {
    return this.apiService.postUpload(
      environment.BASE_URL + 'admin/post-categories',
      data,
      this.auth.getHeaderAuth({}),
    ).pipe(
      catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
      map((response) => this.apiService.handleSuccessObservable(response, this.notification, true))
    );
  }

  chatGPT(data: FormData) {
    return this.apiService.postUpload(
      environment.BASE_URL + 'admin/gpt/chat', 
      data,
      this.auth.getHeaderAuth({}),
    ).pipe(
      catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
      map((response) => this.apiService.handleSuccessObservable(response, this.notification))
    );
  }

  getPost(params: HttpParams) {
    return this.apiService
      .get(environment.BASE_URL + 'admin/posts', this.auth.getHeaderAuth(), params)
      .pipe(
        catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
        map((response) => this.apiService.handleSuccessObservable(response, this.notification))
      );
  }
  getDetail(id: string) {
    return this.apiService
      .get(environment.BASE_URL + 'admin/posts/'+id, this.auth.getHeaderAuth())
      .pipe(
        catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
        map((response) => this.apiService.handleSuccessObservable(response, this.notification))
      );
  }

  getAllPost(status: any){
    return this.apiService.get(
      environment.BASE_URL + `admin/posts?get=true&status=${status}`, 
      this.auth.getHeaderAuth(),
    ).pipe(
      catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
      map((response) => this.apiService.handleSuccessObservable(response, this.notification))
    );
  }
  getCategory() {
    return this.apiService
      .get(environment.BASE_URL + 'admin/post-categories?get=true', this.auth.getHeaderAuth())
      .pipe(
        catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
        map((response) => this.apiService.handleSuccessObservable(response, this.notification))
      );
  }
  getTag() {
    return this.apiService
      .get(environment.BASE_URL + 'admin/tags?get=true', this.auth.getHeaderAuth())
      .pipe(
        catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
        map((response) => this.apiService.handleSuccessObservable(response, this.notification))
      );
  }
  exportPost(params: HttpParams) {
    let exportUrl = environment.BASE_URL + 'admin/posts?' + params.toString() + `&token=${this.auth.getTokenUser()}&get=true&export=true`;
    window.location.href = exportUrl;
  }
  createPost(data: any) {
    return this.apiService.postUpload(
      environment.BASE_URL + 'admin/posts',
      data,
      this.auth.getHeaderAuth({}),
    ).pipe(
      catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
      map((response) => this.apiService.handleSuccessObservable(response, this.notification, true))
    );
  }
  editPost(data: any, id: string) {
    return this.apiService.putFile(
      environment.BASE_URL + 'admin/posts/'+id,
      data,
      this.auth.getHeaderAuth({}),
    ).pipe(
      catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
      map((response) => this.apiService.handleSuccessObservable(response, this.notification, true))
    );
  }
  deletePost(id: string) {
    return this.apiService.delete(
      environment.BASE_URL + `admin/posts`, 
      {ids: [id]},
      this.auth.getHeaderAuth({'Content-Type': 'application/json'}),
    ).pipe(
      catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
      map((response) => this.apiService.handleSuccessObservable(response, this.notification, true))
    );
  }

  changeStatus(data: any): any {
    return this.apiService
      .post(environment.BASE_URL + 'admin/posts/change-status',data, this.auth.getHeaderAuth({'Content-Type': 'application/json'}))
      .pipe(
        catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
        map((response) => {
          this.apiService.handleSuccessObservable(response, this.notification, true)
        })
      );
  }

  getUser(){
    return this.apiService.get(
      environment.BASE_URL + 'admin/users?get=true', 
      this.auth.getHeaderAuth(),
    ).pipe(
      catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
      map((response) => this.apiService.handleSuccessObservable(response, this.notification))
    );
  }

  chat(data: FormData) {
    return this.apiService.postUpload(
      environment.BASE_URL + 'admin/gpt/chat', 
      data,
      this.auth.getHeaderAuth({}),
    ).pipe(
      catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
      map((response) => this.apiService.handleSuccessObservable(response, this.notification))
    );
  }

  getCommentByPostId(postId: any){
    return this.apiService.get(
      environment.BASE_URL + `admin/post-comments?postId=${postId}&get=true`, 
      this.auth.getHeaderAuth(),
    ).pipe(
      catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
      map((response) => this.apiService.handleSuccessObservable(response, this.notification))
    );
  }

  createComment(data: any) {
    return this.apiService.postUpload(
      environment.BASE_URL + 'admin/post-comments',
      data,
      this.auth.getHeaderAuth({}),
    ).pipe(
      catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
      map((response) => this.apiService.handleSuccessObservable(response, this.notification, true))
    );
  }

  editComment(data: any, id: string) {
    return this.apiService.putFile(
      environment.BASE_URL + 'admin/post-comments/'+id,
      data,
      this.auth.getHeaderAuth({}),
    ).pipe(
      catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
      map((response) => this.apiService.handleSuccessObservable(response, this.notification, true))
    );
  }

  deleteComment(id: string) {
    return this.apiService.delete(
      environment.BASE_URL + `admin/post-comments`, 
      {ids: [id]},
      this.auth.getHeaderAuth({'Content-Type': 'application/json'}),
    ).pipe(
      catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
      map((response) => this.apiService.handleSuccessObservable(response, this.notification, true))
    );
  }
}
