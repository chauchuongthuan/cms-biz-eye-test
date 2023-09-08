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
export class DashboardService {
  public currentUser: any;

  constructor(
    private apiService: ApiService,
    private localStorage: LocalService,
    private auth: AuthenticationService,
    private notification: NzNotificationService
  ) {}

  statistic(){
    return this.apiService.get(
      environment.BASE_URL + `admin/dashboard/statistical`, 
      this.auth.getHeaderAuth(),
    ).pipe(
      catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
      map((response) => this.apiService.handleSuccessObservable(response, this.notification))
    );
  }

  statisticDevice(){
    return this.apiService.get(
      environment.BASE_URL + `admin/dashboard/statistical-device`, 
      this.auth.getHeaderAuth(),
    ).pipe(
      catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
      map((response) => this.apiService.handleSuccessObservable(response, this.notification))
    );
  }

  statisticCountry(){
    return this.apiService.get(
      environment.BASE_URL + `admin/dashboard/statistical-country`, 
      this.auth.getHeaderAuth(),
    ).pipe(
      catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
      map((response) => this.apiService.handleSuccessObservable(response, this.notification))
    );
  }

  statisticNewUser(){
    return this.apiService.get(
      environment.BASE_URL + `admin/dashboard/statistical-new-user`, 
      this.auth.getHeaderAuth(),
    ).pipe(
      catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
      map((response) => this.apiService.handleSuccessObservable(response, this.notification))
    );
  }

  statisticFavoritePost(){
    return this.apiService.get(
      environment.BASE_URL + `admin/dashboard/statistical-favorite-post`, 
      this.auth.getHeaderAuth(),
    ).pipe(
      catchError((error) => this.apiService.handleErrorObservable(error, this.notification)),
      map((response) => this.apiService.handleSuccessObservable(response, this.notification))
    );
  }
}
