import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ClientService } from '../../services/client.service';
import { ProductService } from '../../services/product.service';
import { OrderService } from '../../services/order.service';
import { VendorOrderService } from '../../services/vendor-order.service';
import { ConfirmationService } from 'primeng/primeng';

import { Client } from '../../models/client';
import { Product } from '../../models/product';
import { Order } from '../../models/order';
import { Admin } from '../../models/admin';
import { VendorOrder } from '../../models/vendorOrder';

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
  public vendorOrders: Array<VendorOrder>;
  public order: Order;

  public role: String = '';

  public totalRevenue: number;
  public totalExpenses: number;
  public revenueGreaterThanExpenses: boolean;
  public hasExpenses: boolean = true;

  constructor(
    public router: Router,
    public aRoute: ActivatedRoute,
    public authService: AuthService,
    public clientService: ClientService,
    public productService: ProductService,
    public orderService: OrderService,
    public vendorOrderService: VendorOrderService,
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
      let _totalRevenue = 0;
      this.orderService.getOrders().subscribe(
        (data: any): void => {
          this.orders = data.orders;
          for(var i=0; i < this.orders.length; i++) {
            _totalRevenue += this.orders[i].orderBalance;
          }
          this.totalRevenue = _totalRevenue;
          console.log('Revenue', this.totalRevenue);
        }
      );

      //Get Vendor Orders
      let _totalExpenses = 0;
      this.vendorOrderService.getVendorOrders().subscribe(
        (data: any): void => {
          this.vendorOrders = data.vendorOrders;
          for(var i=0; i < this.vendorOrders.length; i++) {
            _totalExpenses += this.vendorOrders[i].vendorOrderBalance;
          }
          this.totalExpenses = _totalExpenses;
          console.log('Expenses', this.totalExpenses);
        }
      );
      //Get Products
      this.productService.getProducts().subscribe(
        (data: any): void => {
          this.products = data.products;
        }
      );

      setTimeout( () => {
        if(this.totalRevenue > 0 && this.totalExpenses > 0) {
          this.hasExpenses = true;
          if(this.totalRevenue >= this.totalExpenses) {
            this.revenueGreaterThanExpenses = true;
          } else {
            this.revenueGreaterThanExpenses = false;
          }
        }
        
        if(this.totalExpenses > 0) {
          this.hasExpenses = true;
        } else {
          this.hasExpenses = false;
        }
      }, 1000);

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
        this.router.navigate(['/client-order-detail/'+this.role+'/'+event.data.orderNumber]);
      }
    });
  }

  onPayVendorClick() {
    console.log(this.totalExpenses, this.totalRevenue);
    let _placeholder = 0;
    _placeholder = this.totalRevenue - this.totalExpenses;
    this.totalRevenue = _placeholder;
    this.totalExpenses = 0;
  }

}
