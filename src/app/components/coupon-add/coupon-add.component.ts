import { Component, OnInit } from '@angular/core';
import { Validators,FormControl,FormGroup,FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CouponService } from '../../services/coupon.service';
import { FlashMessagesService } from 'angular2-flash-messages';

import { Coupon } from '../../models/coupon';
@Component({
  selector: 'app-coupon-add',
  templateUrl: './coupon-add.component.html',
  styleUrls: ['./coupon-add.component.scss']
})
export class CouponAddComponent implements OnInit {
  
  public addCouponForm: FormGroup;
  public coupon: Coupon;

  public couponStatus: string = 'Inactive';

  constructor(
    public router: Router,
    public fB: FormBuilder,
    public couponService: CouponService,
    public flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
    this.addCouponForm = this.fB.group({
      'code': new FormControl('', Validators.required),
      'description': new FormControl(''),
      'discountRate': new FormControl(0, Validators.required),
      'isActive': new FormControl(false)
    });
  }

  onClick() {
    this.router.navigate(['/coupons']);
  }

  onStatusChange(event) {
    if(event) {
      this.couponStatus = 'Active';
    } else {
      this.couponStatus = 'Inactive';
    }
  }

  onAddCouponSubmit(value) {
    console.log(value);
    this.coupon = value;

    this.couponService.addCoupon(this.coupon).subscribe(
      (data: any): void => {
        if(data.success) {
          this.flashMessagesService.show(
            'New coupon added',
            {
              cssClass: 'ui-messages-info',
              timeout: 3000
            }
          );
          this.router.navigate(['/coupons']);
        } else {
          this.flashMessagesService.show(
            'Failed to add new coupon',
            {
              cssClass: 'ui-messages-info',
              timeout: 3000
            }
          );
          this.router.navigate(['/add-coupon']);
        }
      }, 
      (err: Error): void => {
        console.log(err);
      }
    );
  }

}
