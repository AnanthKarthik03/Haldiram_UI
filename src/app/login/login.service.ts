import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppSettings } from '../app.settings';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginserService {
  constructor(private http: HttpClient) {}

  public userData = [];

  adminLogin(values): Observable<any> {
    const url = AppSettings.API.AUTH;
    return this.http.post<any>(url, values).pipe(
      map((user) => {
        if (user && user.token) {
          this.userData = user.data;
          console.log( this.userData);
          sessionStorage.setItem('token', user.token);
          sessionStorage.setItem('name', this.userData['CUSTOMER_NAME']);
        }

        return user;
      })
    );
  }
  regestration(values): Observable<any> {
    const url = AppSettings.API.regestration;
    return this.http.post<any>(url, values).pipe(
      map((user) => {
        return user;
      })
    );
  }
  otp(values): Observable<any> {
    const url = AppSettings.API.otp;
    return this.http.post<any>(url, values).pipe(
      map((user) => {
        return user;
      })
    );
  }
  password(values): Observable<any> {
    const url = AppSettings.API.password;
    return this.http.post<any>(url, values).pipe(
      map((user) => {
        return user;
      })
    );
  }

  token() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'BEARER ' + sessionStorage.getItem('token'),
      }),
    };
    return httpOptions;
  }
}
