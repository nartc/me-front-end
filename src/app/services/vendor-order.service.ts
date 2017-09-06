import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { LocalStorageService } from "./local-storage.service";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";

import { VendorOrder } from '../models/vendorOrder';

@Injectable()
export class VendorOrderService {

  public vendorOrder: VendorOrder;

  constructor(
    public httpService: HttpService
  ) { }
  
  saveVendorOrder(cartEntry: any, vendorOrderId: string, subTotal: number): Observable<any> {
    let body = {cartEntry, vendorOrderId, subTotal};
    return this.httpService.post('/vendor-orders/saveOrder', body, {'Content-Type':'application/json'});
  }

  getVendorOrders(): Observable<any> {
    return this.httpService.get('/vendor-orders/orders', {});
  }

  getVendorOrderByVendorOrderNumber(vendorOrderNumber: string): Observable<any> {
    return this.httpService.get('/vendor-orders/order/'+vendorOrderNumber, {});
  }

  updateReceivedStatus(id: string, receivedStatus: boolean): Observable<any> {
    let body = {receivedStatus};
    return this.httpService.put('/vendor-orders/updateReceipt/'+id, body, {'Content-Type':'application/json'});
  }

  // updatePaidStatus(id: string, paidStatus: boolean): Observable<any> {
  //   let body = {paidStatus};
  //   return this.httpService.put('/orders/updatePayment/'+id, body, {'Content-Type':'application/json'});
  // }
}
