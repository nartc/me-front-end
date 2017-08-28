import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ClientService } from '../../services/client.service';
import { OrderService } from '../../services/order.service';
import { HttpService } from '../../services/http.service';

import { Client } from '../../models/client';
import { Admin } from '../../models/admin';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  public admin: Admin;
  public client: Client;
  public totalRevenue: number;

  public todayDate: Date;

  public clients: Array<Client>;

  public role: String = '';

  constructor(
    public router: Router,
    public aRoute: ActivatedRoute,
    public authService: AuthService,
    public clientService: ClientService,
    public orderService: OrderService,
    public httpService: HttpService
  ) { }

  ngOnInit() {
    //Get Date
    this.todayDate = new Date();
    console.log(this.todayDate);

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
          console.log("Data coming back from clientService.getClients():...");
          console.log(data);
          this.clients = data.clients;
          this.getTotal();
        }
      );

      //Get Orders

      //Get Vendor Orders

      //Get Products


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

  getTotal() {
    let total: number = 0;
    for(let i = 0; i < this.clients.length; i++) {
      total += this.clients[i].balance;
    }

    this.totalRevenue = total;
  }

}
