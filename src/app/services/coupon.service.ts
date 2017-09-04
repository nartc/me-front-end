import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";

import { Coupon } from '../models/coupon';

@Injectable()
export class CouponService {
  public coupon: Coupon;
  public coupons: Array<Coupon>;

  constructor(
    public httpService: HttpService
  ) { }

  getCoupons(): Observable<Coupon> {
    return this.httpService.get('/coupons/coupons', {});
  }

  addCoupon(coupon: Coupon): Observable<any> {
    return this.httpService.post('/coupons/addCoupon', coupon, {'Content-Type':'application/json'});
  }

  updateCouponStatus(id: string, coupon: Coupon): Observable<any> {
    return this.httpService.put('/coupons/updateCoupon/'+id, coupon, {'Content-Type':'application/json'})
  }

  getCouponById(id: string): Observable<any> {
    return this.httpService.get('/coupons/coupon/'+id, {});
  }

  deleteCoupon(id: string): Observable<any> {
    return this.httpService.delete('/coupons/deleteCoupon/'+id, {});
  }
 
}
