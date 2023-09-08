import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiService } from 'src/app/common/services/api.service';
import { AuthenticationService } from 'src/app/common/services/auth.service';
import { ToastService } from 'src/app/common/services/notification.service';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class SettingService {
  constructor(
    private authService: AuthenticationService, 
    private apiService: ApiService,
    private toastService: ToastService, 
    ) 
  {

  }

  getSettingList(params: HttpParams) {
    return this.apiService.get(
      environment.BASE_URL + 'shop/setting',
      this.authService.getHeaderAuth(),
      params
    ).pipe(
      catchError((error) => this.apiService.handleErrorObservable(error, this.toastService)),
      map((response) => this.apiService.handleSuccessObservable(response, this.toastService))
    );
  }

  editSetting(data: any, id: string): Observable<any> {
    return this.apiService
      .putFile<any>(environment.BASE_URL + `shop/settings`, data, this.authService.getHeaderAuth({}))
      .pipe(
        catchError((error) => this.apiService.handleErrorObservable(error, this.toastService)),
        map((response) => this.apiService.handleSuccessObservable(response, this.toastService, true))
      );
  }
}
