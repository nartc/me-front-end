import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { ConfirmationService } from 'primeng/primeng';

import { Order } from '../../models/order';

@Component({
  selector: 'app-client-orders',
  templateUrl: './client-orders.component.html',
  styleUrls: ['./client-orders.component.scss']
})
export class ClientOrdersComponent implements OnInit {
  
  public order: Order;
  public orders: Array<Order>;
  public deliveredCheck: boolean;
  public paidCheck: boolean;

  public hasRevenue: boolean = false;
  public totalRevenue: number;

  constructor(
    public router: Router,
    public confirmationService: ConfirmationService,
    public orderService: OrderService
  ) { 
    
  }

  ngOnInit() {
    //Get all orders
    this.orderService.getOrders().subscribe(
      (data: any): void => {
        this.orders = data.orders;
        this.getTotal();
      }
    );
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
      accept: () => {
        this.router.navigate(['/client-order-detail/'+event.data.orderNumber]);
      }
    });
  }

  onDeliveredChange(order, i) {
    console.log('inDelivered');
    this.confirmationService.confirm({
      message: 'Sure?',
      accept: () => {
        this.deliveredCheck = true;
      },
      reject: () => {
        this.deliveredCheck = false;
        order.isDelivered = !order.isDelivered;
      }
    });
  }

  onPaidChange(order, i) {
    console.log('inPaid');
    this.confirmationService.confirm({
      message: 'Sure?',
      accept: () => {
        this.paidCheck = true;
      },
      reject: () => {
        this.paidCheck = false;
        order.isPaid = !order.isPaid;
      }
    });
  }

}
