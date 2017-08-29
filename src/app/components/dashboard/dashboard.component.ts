import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ClientService } from '../../services/client.service';
import { ProductService } from '../../services/product.service';
import { OrderService } from '../../services/order.service';
import { HttpService } from '../../services/http.service';

import { Client } from '../../models/client';
import { Product } from '../../models/product';
import { Admin } from '../../models/admin';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  public admin: Admin;
  public client: Client;


  public todayDate: Date;

  public clients: Array<Client>;
  public products: Array<Product>;

  public role: String = '';

  constructor(
    public router: Router,
    public aRoute: ActivatedRoute,
    public authService: AuthService,
    public clientService: ClientService,
    public productService: ProductService,
    public orderService: OrderService,
    public httpService: HttpService
  ) { }

  ngOnInit() {
    //Get Date
    this.todayDate = new Date();

    //Get Role
    this.role = this.aRoute.snapshot.params['role'];

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
        },
        (err: Error): void => {
          console.log(err);
        }
      );
    }
  }

}
