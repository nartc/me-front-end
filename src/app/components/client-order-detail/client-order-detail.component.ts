import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { OrderService } from '../../services/order.service';

import { Order } from '../../models/order';

@Component({
  selector: 'app-client-order-detail',
  templateUrl: './client-order-detail.component.html',
  styleUrls: ['./client-order-detail.component.scss']
})
export class ClientOrderDetailComponent implements OnInit {

  public order: Order;
  public orderNumber: string;

  constructor(
    public router: Router,
    public aRoute: ActivatedRoute,
    public orderService: OrderService
  ) { }

  ngOnInit() {
    //Get Order Number
    this.orderNumber = this.aRoute.snapshot.params['id'];
    
    //Get Order by Order Number
    this.orderService.getOrderByOrderNumber(this.orderNumber).subscribe(
      (data: any): void => {
        console.log(data);
        this.order = data.order;
      }
    );
  }

  onClick() {
    this.router.navigate(['/client-orders']);
  }

}
