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
      }
    );
  }

  onRowSelect(event) {
    console.log('On Row Select event:', event.data);
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
