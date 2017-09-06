import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { ProductService } from '../../services/product.service';
import { ClientService } from '../../services/client.service';
import { AuthService } from '../../services/auth.service';
import { Message, ConfirmationService } from 'primeng/primeng';

import { Order } from '../../models/order';

@Component({
  selector: 'app-client-orders',
  templateUrl: './client-orders.component.html',
  styleUrls: ['./client-orders.component.scss']
})
export class ClientOrdersComponent implements OnInit {
  
  public order: Order;
  public orders: Array<Order>;
  public deliveredCheck: Array<boolean>= [];
  public paidCheck: Array<boolean> = [];

  public clientOrderMessages: Array<Message>;

  public hasRevenue: boolean = false;
  public totalRevenue: number;

  public role: string;

  constructor(
    public router: Router,
    public confirmationService: ConfirmationService,
    public orderService: OrderService,
    public authService: AuthService,
    public productService: ProductService,
    public clientService: ClientService
  ) { 
    
  }

  ngOnInit() {
    //Get all orders
    this.orderService.getOrders().subscribe(
      (data: any): void => {
        this.orders = data.orders;
        for(var i=0; i <  this.orders.length; i++) {
          if(this.orders[i].isDelivered) {
            this.deliveredCheck[i] = true;
          }
          if(this.orders[i].isPaid) {
            this.paidCheck[i] = true;
          }
        }
        this.getTotal();
      }
    );

    //Get Role
    this.role = this.authService.currentAdmin.role;
  }

  getTotal() {
    let total: number = 0;
    for(let i = 0; i < this.orders.length; i++) {
      total += this.orders[i].orderBalance;
    }

    this.totalRevenue = total;

    if(this.totalRevenue > 0) {
      this.hasRevenue = true;
    } else {
      this.hasRevenue = false;
    }
  }

  onRowSelect(event) {
    console.log(event);
    this.confirmationService.confirm({
      message: 'View details of "'+event.data.orderNumber+'" ?',
      key: 'onRowSelect',
      accept: () => {
        this.router.navigate(['/client-order-detail/'+this.role+ '/'+ event.data.orderNumber]);
      }
    });
  }

  onDeliveredChange(order, i) {
    console.log('inDelivered');
    console.log(order);
    
    setTimeout(()=>{
      this.deliveredCheck[i] = true;
      this.clientOrderMessages = [];
      this.clientOrderMessages.push({
        severity: 'info',
        summary: 'Success',
        detail: 'Order ' + order.orderNumber + ' is set to Delivered'
      });
    }, 1000);

    let orderQuantity = 0;
    let productId = '';
    order.orderDetails.forEach(orderLine => {
      orderQuantity = -orderLine.quantity;
      productId = orderLine.product._id;

      this.productService.updateProductInstock(productId, orderQuantity).subscribe(
        (data: any): void => {
          if(data.success) {
            console.log(data);
          }
        }
      );
    });

    let deliveredStatus = order.isDelivered;
    let orderId = order._id;
    this.orderService.updateDeliveredStatus(orderId, deliveredStatus).subscribe(
      (data: any): void => {
        if(data.success) {
          console.log(data);
        }
      }
    );
  }

  onPaidChange(order, i) {
    console.log('inPaid');

    setTimeout(()=>{
      this.paidCheck[i] = true;
      this.clientOrderMessages = [];
      this.clientOrderMessages.push({
        severity: 'info',
        summary: 'Success',
        detail: 'Order ' + order.orderNumber + ' is set to Paid'
      });
    }, 1000);

    let balance = -order.orderBalance;
    let userId = order.userId;
    this.clientService.updateBalance(userId, balance).subscribe(
      (data: any): void => {
        console.log(data);
      }
    )

    let paidStatus = order.isPaid;
    let orderId = order._id;
    this.orderService.updatePaidStatus(orderId, paidStatus).subscribe(
      (data: any): void => {
        if(data.success) {
          console.log(data);
        }
      }
    );
  }

}
