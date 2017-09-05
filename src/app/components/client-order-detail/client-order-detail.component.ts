import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { ClientService } from '../../services/client.service';

import { Order } from '../../models/order';

@Component({
  selector: 'app-client-order-detail',
  templateUrl: './client-order-detail.component.html',
  styleUrls: ['./client-order-detail.component.scss']
})
export class ClientOrderDetailComponent implements OnInit {

  public order: Order;
  public orderNumber: string;
  public clientId: string;

  public role: string;

  constructor(
    public router: Router,
    public aRoute: ActivatedRoute,
    public orderService: OrderService,
    public clientService: ClientService
  ) { }

  ngOnInit() {
    //Get Order Number
    this.orderNumber = this.aRoute.snapshot.params['id'];
    //Get Role
    this.role = this.aRoute.snapshot.params['role'];
    //Get ClientID
    if(this.clientService.currentClient) {
      this.clientId = this.clientService.currentClient._id;
    }
    

    //Get Order by Order Number
    this.orderService.getOrderByOrderNumber(this.orderNumber).subscribe(
      (data: any): void => {
        console.log(data);
        this.order = data.order;
      }
    );
  }

  onClick() {
    if(this.role == 'Admin') {
      this.router.navigate(['/client-orders']);
    } else if(this.role == 'Client') {
      this.router.navigate(['/dashboard/'+this.role+'/'+this.clientId]);
    }
    
  }

}
