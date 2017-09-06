import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import { tokenNotExpired } from "angular2-jwt";
import { LocalStorageService } from "./local-storage.service";

import { Client } from '../models/client';

@Injectable()
export class ClientService {

  public clients: Array<Client> = [];
  public client: Client;

  public authToken: any;
  public currentClient: Client;

  constructor(
    public httpService: HttpService,
    public localStorageService: LocalStorageService
  ) { }

  addClient(client: Client): Observable<any> {
    return this.httpService.post('/clients/addClient', client, {'Content-Type':'application/json'});
  }

  authenticateClient(client: Client): Observable<any> {
    return this.httpService.post('/clients/authenticateClient', client, {'Content-Type': 'application/json'});
  }

  getClientProfile(): Observable<any> {
    this.loadToken();
    this.loadCurrentClient();

    return this.httpService.get('/clients/profile', {'Authorization': this.authToken});
  }

  storeClientData(token: any, client: Client): void {
    this.localStorageService.saveValueWithKey('id_token', token);
    this.localStorageService.saveValueWithKey('client', JSON.stringify(client));

    this.authToken = token;
    this.client = client;
  }

  loadToken(): void {
    this.authToken = this.localStorageService.fetchValueFromKey('id_token');
  }

  loadCurrentClient(): Client {
    return this.currentClient = JSON.parse(this.localStorageService.fetchValueFromKey('client'));
  }

  logout(): void {
    this.authToken = null;
    this.client = null;
    this.currentClient = null;
    this.localStorageService.clearAll();
  }

  changePassword(client: Client, candidatePassword: string, newPassword: string): Observable<any> {
    let data = {client, candidatePassword, newPassword};
    return this.httpService.put('/clients/password', data, {'Content-Type':'application/json'});
  }

  getClients(): Observable<any>{
    return this.httpService.get('/clients/clients', {});
  }

  getClientById(id: string): Observable<any>{
    return this.httpService.get('/clients/client/'+id, {});
  }

  updateClient(id: string, client: Client): Observable<any>{
    console.log(client);
    return this.httpService.put('/clients/update/'+id, client, {'Content-Type':'application/json'});
  }

  updateBalance(id: string, balance: number): Observable<any>{
    let body = {balance};
    return this.httpService.put('/clients/balanceUpdate/'+id, body, {'Content-Type':'application/json'});
  }

  deleteClient(id: string): Observable<any>{
    return this.httpService.delete('/clients/delete/'+id, {});
  }

}
