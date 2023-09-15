import { HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map } from "rxjs/operators";

import { ApiService } from "src/app/common/services/api.service";
import { AuthenticationService } from "src/app/common/services/auth.service";
import { LocalService } from "src/app/common/services/local.service";
// import any from '../model/category.model';
import { environment } from "src/environments/environment";
import { NzNotificationService } from "ng-zorro-antd/notification";

@Injectable({ providedIn: "root" })
export class ExpertiseService {
   public currentUser: any;

   constructor(
      private apiService: ApiService,
      private localStorage: LocalService,
      private auth: AuthenticationService,
      private notification: NzNotificationService,
   ) {}

   getExpertise(params: HttpParams) {
      return this.apiService.get(environment.BASE_URL + "admin/expertise", this.auth.getHeaderAuth(), params).pipe(
         catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
         map((response) => this.apiService.handleSuccessObservable(response, this.notification)),
      );
   }

   createExpertise(data: any) {
      return this.apiService.postUpload(environment.BASE_URL + "admin/expertise", data, this.auth.getHeaderAuth({})).pipe(
         catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
         map((response) => this.apiService.handleSuccessObservable(response, this.notification, true)),
      );
   }

   editExpertise(data: any, id: string) {
      return this.apiService.putFile(environment.BASE_URL + "admin/expertise/" + id, data, this.auth.getHeaderAuth({})).pipe(
         catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
         map((response) => this.apiService.handleSuccessObservable(response, this.notification, true)),
      );
   }

   deleteExpertise(id: string) {
      return this.apiService
         .delete(
            environment.BASE_URL + `admin/expertise`,
            { ids: [id] },
            this.auth.getHeaderAuth({ "Content-Type": "application/json" }),
         )
         .pipe(
            catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
            map((response) => this.apiService.handleSuccessObservable(response, this.notification, true)),
         );
   }
}

