import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../common/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  baseUrl: string = 'http://localhost:3000/api';
  noAuthHeader = { headers: new HttpHeaders({ NoAuth: 'True' }) };

  //Http Methods
  createUser(user: User) {
    return this.http.post(`${this.baseUrl}/register`, user, this.noAuthHeader);
  }
  login(userCredentials) {
    return this.http.post(
      this.baseUrl + '/authenticate',
      userCredentials,
      this.noAuthHeader
    );
  }

  getUserProfile() {
    return this.http.get(this.baseUrl + '/userProfile');
  }

  //Helper Methods
  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  deleteToken() {
    localStorage.removeItem('token');
  }
  getToken() {
    return localStorage.getItem('token');
  }
  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    } else {
      return null;
    }
  }
  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload) {
      return userPayload.exp > Date.now() / 1000;
    }
  }
}
