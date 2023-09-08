import { HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, map, Observable } from "rxjs";
import { ApiService } from "src/app/common/services/api.service";
import { AuthenticationService } from "src/app/common/services/auth.service";
import { LocalService } from "src/app/common/services/local.service";
import { environment } from "src/environments/environment";
import { IInterest } from "../model/interest.model";
import { NzNotificationService } from "ng-zorro-antd/notification";

@Injectable({ providedIn: "root" })
export class InterestService {
   public currentUser: any;

   constructor(
      private apiService: ApiService,
      private localStorage: LocalService,
      private auth: AuthenticationService,
      private notification: NzNotificationService,
   ) {}

   getInterest(params: HttpParams) {
      return this.apiService.get<IInterest>(environment.BASE_URL + "admin/interests", this.auth.getHeaderAuth(), params).pipe(
         catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
         map((response) => this.apiService.handleSuccessObservable(response, this.notification)),
      );
   }

   createInterest(data: any): Observable<IInterest> {
      return this.apiService.postUpload(environment.BASE_URL + "admin/interests", data, this.auth.getHeaderAuth({})).pipe(
         catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
         map((response) => this.apiService.handleSuccessObservable(response, this.notification, true)),
      );
   }

   editInterest(data: any, id: string) {
      return this.apiService.putFile(environment.BASE_URL + "admin/interests/" + id, data, this.auth.getHeaderAuth({})).pipe(
         catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
         map((response) => this.apiService.handleSuccessObservable(response, this.notification, true)),
      );
   }

   deleteInterest(id: string) {
      return this.apiService
         .delete(
            environment.BASE_URL + "admin/interests",
            { ids: [id] },
            this.auth.getHeaderAuth({ "Content-Type": "application/json" }),
         )
         .pipe(
            catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
            map((response) => this.apiService.handleSuccessObservable(response, this.notification, true)),
         );
   }

   exportInterest(params: HttpParams) {
      let conditions = params
         .keys()
         .map((k) => `${k}=${params.getAll(k)}`)
         .join("&");
      return (window.location.href =
         environment.BASE_URL + `admin/interests?get=true&export=true&token=${this.auth.getTokenUser()}&${conditions}`);
   }

   changeStatus(id: any, status: any): Observable<IInterest> {
      return this.apiService
         .postFile<IInterest>(
            environment.BASE_URL + "admin/interests/change-status",
            { id: id, status: status },
            this.auth.getHeaderAuth({}),
         )
         .pipe(
            catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
            map((response) => this.apiService.handleSuccessObservable(response, this.notification, true)),
         );
   }

}

