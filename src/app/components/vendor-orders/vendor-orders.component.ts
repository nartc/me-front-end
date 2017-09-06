import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VendorOrderService } from '../../services/vendor-order.service';
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';
import { Message, ConfirmationService } from 'primeng/primeng';

import { VendorOrder } from '../../models/vendorOrder';

@Component({
  selector: 'app-vendor-orders',
  templateUrl: './vendor-orders.component.html',
  styleUrls: ['./vendor-orders.component.scss']
})
export class VendorOrdersComponent implements OnInit {
  
  public vendorOrder: VendorOrder;
  public vendorOrders: Array<VendorOrder>;
  public receivedCheck: Array<boolean>= [];

  public vendorOrderMessages: Array<Message>;

  public hasExpense: boolean = false;
  public totalExpenses: number;

  public role: string;

  constructor(
    public router: Router,
    public vendorOrderService: VendorOrderService,
    public productService: ProductService,
    public authService: AuthService,
    public confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    //Get All Vendor Orders
    this.vendorOrderService.getVendorOrders().subscribe(
      (data: any): void => {
        this.vendorOrders = data.vendorOrders;
        for(var i=0; i <  this.vendorOrders.length; i++) {
          if(this.vendorOrders[i].isReceived) {
            this.receivedCheck[i] = true;
          }
        }
        
        this.getTotalExpense();
      }
    );

    //Get Role
    this.role = this.authService.currentAdmin.role;
  }

  getTotalExpense() {
    let total: number = 0;
    for(let i = 0; i < this.vendorOrders.length; i++) {
      total += this.vendorOrders[i].vendorOrderBalance;
    }

    this.totalExpenses = total;

    if(this.totalExpenses > 0) {
      this.hasExpense = true;
    } else {
      this.hasExpense = false;
    }
  }

  onRowSelect(event) {
    console.log(event);
    this.confirmationService.confirm({
      message: 'View details of "'+event.data.vendorOrderNumber+'" ?',
      key: 'onRowSelect',
      accept: () => {
        this.router.navigate(['/vendor-order-detail/'+ event.data.vendorOrderNumber]);
      }
    });
  }

  onReceivedChange(vendorOrder, i) {
    console.log(vendorOrder, i);
    setTimeout(()=>{
      this.receivedCheck[i] = true;
      this.vendorOrderMessages = [];
      this.vendorOrderMessages.push({
        severity: 'info',
        summary: 'Success',
        detail: 'Order ' + vendorOrder.vendorOrderNumber + ' is set to Delivered'
      });
    }, 1000);

    let orderQuantity = 0;
    let productId = '';
    vendorOrder.vendorOrderDetails.forEach(orderLine => {
      orderQuantity = orderLine.quantity;
      productId = orderLine.product._id;

      this.productService.updateProductInstock(productId, orderQuantity).subscribe(
        (data: any): void => {
          if(data.success) {
            console.log(data);
          }
        }
      );
    });

    let receivedStatus = vendorOrder.isReceived;
    let orderId = vendorOrder._id;
    this.vendorOrderService.updateReceivedStatus(orderId, receivedStatus).subscribe(
      (data: any): void => {
        if(data.success) {
          console.log(data);
        }
      }
    );
  }

}
