import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ClientService } from '../../services/client.service';
import { ProductService } from '../../services/product.service';
import { OrderService } from '../../services/order.service';
import { ConfirmationService } from 'primeng/primeng';

import { Client } from '../../models/client';
import { Product } from '../../models/product';
import { Order } from '../../models/order';
import { Admin } from '../../models/admin';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  public admin: Admin;
  public client: Client;
  public hasBalance: boolean = false;

  public clientId: string;

  public todayDate: Date;

  public clients: Array<Client>;
  public products: Array<Product>;
  public orders: Array<Order>;
  public order: Order;

  public role: String = '';

  constructor(
    public router: Router,
    public aRoute: ActivatedRoute,
    public authService: AuthService,
    public clientService: ClientService,
    public productService: ProductService,
    public orderService: OrderService,
    public confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    //Get Date
    this.todayDate = new Date();

    //Get Role
    this.role = this.aRoute.snapshot.params['role'];

    //GetId
    this.clientId = this.aRoute.snapshot.params['id'];

    //Get Stuffs
    if(this.role == 'Admin') {
      //Get Profile
      this.authService.getAdminProfile().subscribe(
        (profile: any): void => {
          this.admin = profile.admin;
        },
        (err: Error): void => {
          console.log(err);
        }
      );

      //Get Clients
      this.clientService.getClients().subscribe(
        (data: any): void => {
          this.clients = data.clients;
        }
      );

      //Get Orders
      this.orderService.getOrders().subscribe(
        (data: any): void => {
          this.orders = data.orders;
        }
      );

      //Get Vendor Orders

      //Get Products
      this.productService.getProducts().subscribe(
        (data: any): void => {
          this.products = data.products;
        }
      );


    } else if(this.role == 'Client') {
      //Get Profile
      this.clientService.getClientProfile().subscribe(
        (profile: any): void => {
          this.client = profile.client;
          if(this.client.balance > 0) {
            this.hasBalance = true;
          } else {
            this.hasBalance = false;
          }
        },
        (err: Error): void => {
          console.log(err);
        }
      );

      console.log(this.clientId);
      //Get Orders by UserId
      this.orderService.getOrdersByUserId(this.clientId).subscribe(
        (data: any): void => {
          this.orders = data.orders;
        }
      );
    }
  }

  onRowSelect(event) {
    this.confirmationService.confirm({
      message: 'View details of "'+event.data.orderNumber+'" ?',
      accept: () => {
        this.router.navigate(['/client-order-detail/'+event.data.orderNumber]);
      }
    });
  }

}
