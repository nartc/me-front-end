import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CouponService } from '../../services/coupon.service';
import { ConfirmationService, Message } from 'primeng/primeng';

import { Coupon } from '../../models/coupon';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.scss']
})
export class CouponComponent implements OnInit {
  
  public coupons: Array<Coupon>;
  public coupon: Coupon;

  public couponStatuses: Array<string> = [];
  public couponStatus: string;

  public couponMessages: Array<Message>;

  constructor(
    public router: Router,
    public couponService: CouponService,
    public confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.couponService.getCoupons().subscribe(
      (data: any): void => {
        if(data.success) {
          this.coupons = data.coupons;
          this.coupons.forEach(coupon => {
            if(coupon.isActive) {
              this.couponStatus = 'Active'
            } else {
              this.couponStatus = 'Inactive'
            }
            this.couponStatuses.push(this.couponStatus);
            console.log(this.couponStatuses);
          });
        }
      }
    ); 
  }

  onAddCouponClick() {
    this.router.navigate(['/add-coupon']);
  }

  onRowSelect(event) {
    this.confirmationService.confirm({
      message: 'View details of "'+event.data.code+'" ?',
      accept: () => {
        this.router.navigate(['/coupon/'+event.data._id]);
      }
    });
  }

  onStatusChange(event, coupon, i) {
    if(event) {
          this.couponService.updateCouponStatus(coupon._id, coupon).subscribe(
            (data: any): void => {
              if(data.success) {
                this.couponStatuses[i] = 'Active'
                this.couponMessages = [];
                this.couponMessages.push({
                  severity: 'success',
                  summary: 'Success',
                  detail: data.msg
                });
                this.router.navigate(['/coupons']);
              } else {
                this.couponMessages = [];
                this.couponMessages.push({
                  severity: 'error',
                  summary: 'Error',
                  detail: data.msg
                });
                this.router.navigate(['/coupons']);
              }
            }
          );
    } else {
          this.couponService.updateCouponStatus(coupon._id, coupon).subscribe(
            (data: any): void => {
              if(data.success) {
                this.couponStatuses[i] = 'Inactive'
                this.couponMessages = [];
                this.couponMessages.push({
                  severity: 'success',
                  summary: 'Success',
                  detail: data.msg
                });
                this.router.navigate(['/coupons']);
              } else {
                this.couponMessages = [];
                this.couponMessages.push({
                  severity: 'error',
                  summary: 'Error',
                  detail: data.msg
                });
                this.router.navigate(['/coupons']);
              }
            }
          );
    }
  }

}
