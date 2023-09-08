import { HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, map, Observable } from "rxjs";
import { ApiService } from "src/app/common/services/api.service";
import { AuthenticationService } from "src/app/common/services/auth.service";
import { LocalService } from "src/app/common/services/local.service";
import { environment } from "src/environments/environment";
import { IMailSchedule } from "../model/mail-schedule.model";
import { NzNotificationService } from "ng-zorro-antd/notification";

@Injectable({ providedIn: "root" })
export class MailScheduleService {
   public currentUser: any;

   constructor(
      private apiService: ApiService,
      private localStorage: LocalService,
      private auth: AuthenticationService,
      private notification: NzNotificationService,
   ) {}

   getMailSchedule(params: HttpParams) {
      return this.apiService.get<IMailSchedule>(environment.BASE_URL + "admin/mail-schedules", this.auth.getHeaderAuth(), params).pipe(
         catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
         map((response) => this.apiService.handleSuccessObservable(response, this.notification)),
      );
   }

   createMailSchedule(data: any): Observable<IMailSchedule> {
      return this.apiService.postUpload(environment.BASE_URL + "admin/mail-schedules", data, this.auth.getHeaderAuth({})).pipe(
         catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
         map((response) => this.apiService.handleSuccessObservable(response, this.notification, true)),
      );
   }

   editMailSchedule(data: any, id: string) {
      return this.apiService.putFile(environment.BASE_URL + "admin/mail-schedules/" + id, data, this.auth.getHeaderAuth({})).pipe(
         catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
         map((response) => this.apiService.handleSuccessObservable(response, this.notification, true)),
      );
   }

   deleteMailSchedule(id: string) {
      return this.apiService
         .delete(
            environment.BASE_URL + "admin/mail-schedules",
            { ids: [id] },
            this.auth.getHeaderAuth({ "Content-Type": "application/json" }),
         )
         .pipe(
            catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
            map((response) => this.apiService.handleSuccessObservable(response, this.notification, true)),
         );
   }

   exportMailSchedule(params: HttpParams) {
      let conditions = params
         .keys()
         .map((k) => `${k}=${params.getAll(k)}`)
         .join("&");
      return (window.location.href =
         environment.BASE_URL + `admin/mail-schedules?get=true&export=true&token=${this.auth.getTokenUser()}&${conditions}`);
   }

   changeStatus(id: any, status: any): Observable<IMailSchedule> {
      return this.apiService
         .postFile<IMailSchedule>(
            environment.BASE_URL + "admin/mail-schedules/change-status",
            { id: id, status: status },
            this.auth.getHeaderAuth({}),
         )
         .pipe(
            catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
            map((response) => this.apiService.handleSuccessObservable(response, this.notification, true)),
         );
   }

   getInterest() {
      return this.apiService.get(environment.BASE_URL + "admin/interests?get=true&status=true", this.auth.getHeaderAuth()).pipe(
         catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
         map((response) => this.apiService.handleSuccessObservable(response, this.notification)),
      );
   }

   getUser(){
     return this.apiService.get(
       environment.BASE_URL + 'admin/mail-lists?get=true&status=true', 
       this.auth.getHeaderAuth(),
     ).pipe(
       catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
       map((response) => this.apiService.handleSuccessObservable(response, this.notification))
     );
   }
}

