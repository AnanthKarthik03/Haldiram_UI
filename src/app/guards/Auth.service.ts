import { Injectable } from "@angular/core";
// import { Http, Response, Headers } from "@angular/http";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import * as jwt_decode from "jwt-decode";

export const TOKEN_NAME = "jwt_token";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient) {}

  getToken(): string {
    return sessionStorage.getItem("token");
  }

  setToken(token: string): void {
    sessionStorage.setItem(TOKEN_NAME, token);
  }

  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);

    if (decoded.exp === undefined) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) {
      token = this.getToken();
    }
    if (!token) {
      return true;
    }

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) {
      return false;
    }
    // return !(date.valueOf() > new Date().valueOf());
  }
}