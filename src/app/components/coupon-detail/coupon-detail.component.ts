import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CouponService } from '../../services/coupon.service';
import { ConfirmationService } from 'primeng/primeng';
import { FlashMessagesService } from 'angular2-flash-messages';

import { Coupon } from '../../models/coupon';

@Component({
  selector: 'app-coupon-detail',
  templateUrl: './coupon-detail.component.html',
  styleUrls: ['./coupon-detail.component.scss']
})
export class CouponDetailComponent implements OnInit {
  
  public coupon: Coupon;
  public id: string;

  public couponStatus: string;

  constructor(
    public couponService: CouponService,
    public router: Router,
    public aRoute: ActivatedRoute,
    public confirmationService: ConfirmationService,
    public flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
    //Get ID
    this.id = this.aRoute.snapshot.params['id'];

    //Get Coupon by Id
    this.couponService.getCouponById(this.id).subscribe(
      (data: any): void => {
        this.coupon = data.coupon;
        console.log(this.coupon);
        if(this.coupon.isActive) {
          this.couponStatus = 'Active'
        } else {
          this.couponStatus = 'Inactive'
        }
      }
    );
  }

  onClick() {
    this.router.navigate(['/coupons']);
  }

  onDeleteClick() {
    this.confirmationService.confirm({
      message: 'Delete the coupon "'+this.coupon.code+'" ?',
      accept: () => {
        this.couponService.deleteCoupon(this.id).subscribe(
          (data: any): void => {
            if(data.success) {
              this.flashMessagesService.show(
                'Coupon '+this.coupon.code+ ' deleted',
                {
                  cssClass: 'ui-messages-info',
                  timeout: 3000
                }
              );
              this.router.navigate(['/coupons']);
            } else {
              this.flashMessagesService.show(
                'Failed to delete coupon '+this.coupon.code,
                {
                  cssClass: 'ui-messages-danger',
                  timeout: 3000
                }
              );
              this.router.navigate(['/coupon/'+this.id]);
            }
          }
        );
      }
    });
  }

}
