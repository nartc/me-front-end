import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { LocalStorageService } from "./local-storage.service";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";

import { Order } from '../models/order';

@Injectable()
export class OrderService {

  public order: Order;

  constructor(
    public httpService: HttpService
  ) { }

  saveOrder(cartEntry: any, orderId: string, userId: string, subTotal: number): Observable<Order> {
    let body = {cartEntry, orderId, userId, subTotal};
    return this.httpService.post('/orders/saveOrder', body, {'Content-Type':'application/json'});
  }

  getOrders(): Observable<Order> {
    return this.httpService.get('/orders/orders', {});
  }

  getOrdersByUserId(userId: string): Observable<Order> {
    return this.httpService.get('/orders/orders/'+userId, {});
  }

}
