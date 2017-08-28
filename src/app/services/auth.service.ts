import { Injectable } from '@angular/core';
import "rxjs/add/operator/map";
import { tokenNotExpired } from "angular2-jwt";
import { Observable } from "rxjs/Observable";
import { HttpService } from "./http.service";
import { LocalStorageService } from "./local-storage.service";

import { Admin } from '../models/admin';

@Injectable()
export class AuthService {

  public authToken: any;
  public admin: Admin;
  public currentAdmin: Admin;

  constructor(
    public httpService: HttpService,
    public localStorageService: LocalStorageService
  ) { }

  authenticateAdmin(admin: Admin): Observable<any> {
    return this.httpService.post('/admins/authenticate', admin, {'Content-Type': 'application/json'});
  }

  getAdminProfile(): Observable<any> {
    this.loadToken();
    this.loadCurrentAdmin();

    return this.httpService.get('/admins/profile', {'Authorization': this.authToken});
  }

  storeAdminData(token: any, admin: Admin): void {
    this.localStorageService.saveValueWithKey('id_token', token);
    this.localStorageService.saveValueWithKey('admin', JSON.stringify(admin));

    this.authToken = token;
    this.admin = admin;
  }

  loadToken(): void {
    this.authToken = this.localStorageService.fetchValueFromKey('id_token');
  }

  loadCurrentAdmin(): Admin {
    return this.currentAdmin = JSON.parse(this.localStorageService.fetchValueFromKey('admin'));
  }

  isLoggedIn(): boolean {
    return tokenNotExpired('id_token');
  }

  logout(): void {
    this.authToken = null;
    this.admin = null;
    this.currentAdmin = null;
    this.localStorageService.clearAll();
  }

  changePassword(admin: Admin, candidatePassword: string, newPassword: string): Observable<any> {
    let data = {admin, candidatePassword, newPassword};
    return this.httpService.put('/admins/password', data, {'Content-Type':'application/json'});
  }

}
