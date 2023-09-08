import { HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, map, Observable } from "rxjs";
import { ApiService } from "src/app/common/services/api.service";
import { AuthenticationService } from "src/app/common/services/auth.service";
import { LocalService } from "src/app/common/services/local.service";
import { environment } from "src/environments/environment";
import { IMailList } from "../model/mail-list.model";
import { NzNotificationService } from "ng-zorro-antd/notification";

@Injectable({ providedIn: "root" })
export class MailListService {
   public currentUser: any;

   constructor(
      private apiService: ApiService,
      private localStorage: LocalService,
      private auth: AuthenticationService,
      private notification: NzNotificationService,
   ) {}

   getMailList(params: HttpParams) {
      return this.apiService.get<IMailList>(environment.BASE_URL + "admin/mail-lists", this.auth.getHeaderAuth(), params).pipe(
         catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
         map((response) => this.apiService.handleSuccessObservable(response, this.notification)),
      );
   }

   createMailList(data: any): Observable<IMailList> {
      return this.apiService.postUpload(environment.BASE_URL + "admin/mail-lists", data, this.auth.getHeaderAuth({})).pipe(
         catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
         map((response) => this.apiService.handleSuccessObservable(response, this.notification, true)),
      );
   }

   editMailList(data: any, id: string) {
      return this.apiService.putFile(environment.BASE_URL + "admin/mail-lists/" + id, data, this.auth.getHeaderAuth({})).pipe(
         catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
         map((response) => this.apiService.handleSuccessObservable(response, this.notification, true)),
      );
   }

   deleteMailList(id: string) {
      return this.apiService
         .delete(
            environment.BASE_URL + "admin/mail-lists",
            { ids: [id] },
            this.auth.getHeaderAuth({ "Content-Type": "application/json" }),
         )
         .pipe(
            catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
            map((response) => this.apiService.handleSuccessObservable(response, this.notification, true)),
         );
   }

   exportMailList(params: HttpParams) {
      let conditions = params
         .keys()
         .map((k) => `${k}=${params.getAll(k)}`)
         .join("&");
      return (window.location.href =
         environment.BASE_URL + `admin/mail-lists?get=true&export=true&token=${this.auth.getTokenUser()}&${conditions}`);
   }

   importMailList(data: any): Observable<IMailList> {
      return this.apiService.postUpload(environment.BASE_URL + "admin/mail-lists/import", data, this.auth.getHeaderAuth({})).pipe(
         catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
         map((response) => this.apiService.handleSuccessObservable(response, this.notification, true)),
      );
   }

   changeStatus(id: any, status: any): Observable<IMailList> {
      return this.apiService
         .postFile<IMailList>(
            environment.BASE_URL + "admin/mail-lists/change-status",
            { id: id, status: status },
            this.auth.getHeaderAuth({}),
         )
         .pipe(
            catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
            map((response) => this.apiService.handleSuccessObservable(response, this.notification, true)),
         );
   }

   getInterest() {
      return this.apiService.get(environment.BASE_URL + "admin/interests?get=true", this.auth.getHeaderAuth()).pipe(
         catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
         map((response) => this.apiService.handleSuccessObservable(response, this.notification)),
      );
   }
}

