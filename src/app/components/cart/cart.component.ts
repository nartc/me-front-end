import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';
import { ClientService } from '../../services/client.service';
import { CouponService } from '../../services/coupon.service';
import { VendorOrderService } from '../../services/vendor-order.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ConfirmationService } from 'primeng/primeng';
import { FlashMessagesService } from 'angular2-flash-messages';
import { LocalStorageService } from '../../services/local-storage.service';

import { CartEntry } from '../../models/cart';
import { Coupon } from '../../models/coupon';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public cart: Array<CartEntry> = [];
  public role: string;
  public id: string;
  public quantity: number;
  public subTotal: number = 0;
  public discount: number = 0;
  public cartTotal: number = 0;
  public couponCode: string;
  public userId: string;
  public coupons: Array<Coupon>;
  public couponAccepted: boolean = false;
  public couponAmount: number;
  public couponSubmitted: boolean = false;

  constructor(
    public router: Router,
    public aRoute: ActivatedRoute,
    public cartService: CartService,
    public confirmationService: ConfirmationService,
    public flashMessagesService: FlashMessagesService,
    public orderService: OrderService,
    public clientService: ClientService,
    public authService: AuthService,
    public localStorageService: LocalStorageService,
    public couponService: CouponService,
    public vendorOrderService: VendorOrderService
  ) { }

  ngOnInit() {
    //Get Role
    this.role = this.aRoute.snapshot.params['role'];

    //Get Id
    this.id = this.aRoute.snapshot.params['id'];
    
    //Get Current User ID
    if(this.role == 'Client') {
      this.userId = this.clientService.currentClient._id;
    } else if(this.role == 'Admin') {
      this.userId = this.authService.currentAdmin._id;
    }
    //Get CartEntries
    this.cartService.getAllCartEntries()
      .then(
        (carts: any) => {
          this.cart = carts;
          this.getTotal();
        }
      );

    //Get Coupon Data
    this.couponService.getCoupons().subscribe(
      (data: any): void => {
        this.coupons = data.coupons;
      }
    );
  }

  onChange(cartLine: CartEntry) {
    console.log(cartLine.quantity);

    var productNumber = cartLine.product.productNumber;
    var newQuantity = cartLine.quantity;
  
    var cartEntry: CartEntry = this.cart.find(
      cartEntry => cartEntry.product.productNumber == productNumber
    );

    if(newQuantity > 0) {
      cartEntry.quantity = newQuantity;

      this.getTotal();

      this.cartService.saveListOfCartEntries(this.cart);

      if(cartEntry.quantity > cartEntry.product.inStock) {
        cartEntry.backOrder = true;
      } else {
        cartEntry.backOrder = false;
      }
    }

    console.log(this.cart);

  }

  onRemoveClick(productNumber: string) {
    this.cart = this.cart.filter(
      cartEntry => cartEntry.product.productNumber != productNumber
    );

    this.cartService.saveListOfCartEntries(this.cart);

    this.getTotal();
  }

  onCouponSubmitClick(couponCode: string) {
    for(var i=0; i <  this.coupons.length; i++) {
      if(couponCode == this.coupons[i].code) {
        if(this.coupons[i].isActive) {
          this.couponAccepted = true;
          this.couponAmount = this.coupons[i].discountRate;
        } 
      } else {
        this.couponAccepted = false;
      }
    }
    
    this.couponSubmitted = true;

    this.getTotal();
  }

  getTotal() {
    let _subTotal = 0;

    this.cart.forEach((cartEntry: CartEntry) => {
      if(this.role == 'Client') {
        _subTotal += (cartEntry.product.productSellPrice * cartEntry.quantity);
      } else if (this.role == 'Admin') {
        _subTotal += (cartEntry.product.productBuyPrice * cartEntry.quantity);
      }
      
    });

    this.subTotal = _subTotal;
    
    let _discount = 0;
    let _total = 0;
    
    this.cartTotal = this.subTotal;

    if(this.couponAccepted) {
      _discount = this.couponAmount * this.subTotal;
      _total = this.subTotal - _discount;

      this.discount = _discount;
      this.cartTotal = _total;
    } else {
      this.discount = 0;
    }
  }
  
  onSendClick() {
    console.log(this.cart);
    if(this.role == 'Client') {
      console.log('I am in onSendClick')
      this.confirmationService.confirm({
        message: 'Are you sure to confirm this order?',
        accept: () => {
          this.orderService.saveOrder(this.cart, this.id, this.userId, this.cartTotal).subscribe(
            (data: any): void => {
              if(data.success) {
                this.flashMessagesService.show(
                  'New Order Added',
                  {
                    cssClass: 'ui-messages-info',
                    timeout: 3000
                  }
                );
                this.localStorageService.deleteValueWithKey('cart');
                this.router.navigate(['dashboard/'+this.role+'/'+this.userId]);
              } else {
                this.flashMessagesService.show(
                  'Failed to add new order',
                  {
                    cssClass: 'ui-messages-danger',
                    timeout: 3000
                  }
                );
                this.router.navigate(['cart/'+this.role+'/'+this.id]);
              }
            }
          );

          this.clientService.updateBalance(this.userId, this.cartTotal).subscribe(
            (data: any):void => {
              if(data.success) {
                console.log(data);
              }
            }
          );
        }
      });
    } else if(this.role == 'Admin') {
      this.confirmationService.confirm({
        message: 'Are you confirming this order?',
        accept: () => {
          this.vendorOrderService.saveVendorOrder(this.cart, this.id, this.cartTotal).subscribe(
            (data: any): void => {
              if(data.success) {
                this.flashMessagesService.show(
                  'New Vendor Order Placed',
                  {
                    cssClass: 'ui-messages-info',
                    timeout: 3000
                  }
                );
                this.localStorageService.deleteValueWithKey('cart');
                this.router.navigate(['/dashboard/'+this.role+'/'+this.userId]);
              } else {
                this.flashMessagesService.show(
                  'Failed to place vendor order',
                  {
                    cssClass: 'ui-messages-info',
                    timeout: 3000
                  }
                );
                this.router.navigate(['/cart/'+this.role+'/'+this.id]);
              }
            }
          );
        }
      });
    }
  }

}
