import { HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { ApiService } from "src/app/common/services/api.service";
import { AuthenticationService } from "src/app/common/services/auth.service";
import { LocalService } from "src/app/common/services/local.service";
// import any from '../model/category.model';
import { environment } from "src/environments/environment";
import { NzNotificationService } from "ng-zorro-antd/notification";

@Injectable({ providedIn: "root" })
export class AwardService {
   public currentUser: any;

   constructor(
      private apiService: ApiService,
      private localStorage: LocalService,
      private auth: AuthenticationService,
      private notification: NzNotificationService,
   ) {}

   getAward(params: HttpParams) {
      return this.apiService.get(environment.BASE_URL + "admin/award", this.auth.getHeaderAuth(), params).pipe(
         catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
         map((response) => this.apiService.handleSuccessObservable(response, this.notification)),
      );
   }

   getAwardAll() {
      return this.apiService.get(environment.BASE_URL + "admin/award?get=true", this.auth.getHeaderAuth()).pipe(
         catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
         map((response) => this.apiService.handleSuccessObservable(response, this.notification)),
      );
   }

   getCategoryAll() {
      return this.apiService.get(environment.BASE_URL + "admin/category?get=true", this.auth.getHeaderAuth()).pipe(
         catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
         map((response) => this.apiService.handleSuccessObservable(response, this.notification)),
      );
   }

   createAward(data: any) {
      return this.apiService.postUpload(environment.BASE_URL + "admin/award", data, this.auth.getHeaderAuth({})).pipe(
         catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
         map((response) => this.apiService.handleSuccessObservable(response, this.notification, true)),
      );
   }

   createPostAward(data: any) {
      return this.apiService.postUpload(environment.BASE_URL + "admin/post-award", data, this.auth.getHeaderAuth({})).pipe(
         catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
         map((response) => this.apiService.handleSuccessObservable(response, this.notification, true)),
      );
   }

   editAward(data: any, id: string) {
      return this.apiService.putFile(
        environment.BASE_URL + 'admin/award/'+id,
        data,
        this.auth.getHeaderAuth({}),
      ).pipe(
        catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
        map((response) => this.apiService.handleSuccessObservable(response, this.notification, true))
      );
   }

   deleteAward(id: string) {
      return this.apiService.delete(
        environment.BASE_URL + `admin/award`, 
        {ids: [id]},
        this.auth.getHeaderAuth({'Content-Type': 'application/json'}),
      ).pipe(
        catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
        map((response) => this.apiService.handleSuccessObservable(response, this.notification, true))
      );
    }
}

