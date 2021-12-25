import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl: string = 'http://localhost:5800/login';

  constructor(private http: HttpClient, private router: Router, private jwtHelper: JwtHelperService) { }

  login(credentials: Object) {
    return this.http.post(this.loginUrl, credentials);
  }

  isLoggedin() {
    const token = localStorage.getItem('authToken');
    if (!token) {
      return false;
    }
    const isExpired = this.jwtHelper.isTokenExpired(token);
    return !isExpired;
  }

  logout() {
    localStorage.removeItem('authToken');
    this.router.navigate(['./login']);
  }
}
