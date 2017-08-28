import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ClientService } from '../../services/client.service';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/primeng';

import { Client } from '../../models/client';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  
  public totalRevenue: number;
  public clients: Array<Client>;
  public client: Client;

  constructor(
    public authService: AuthService,
    public router: Router,
    public clientService: ClientService,
    public confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.clientService.getClients().subscribe(
      (data: any): void => {
        if(data.success) {
          this.clients = data.clients;
          this.getTotal();
        }
      }
    );
  }

  getTotal() {
    let total: number = 0;
    for(let i = 0; i < this.clients.length; i++) {
      total += this.clients[i].balance;
    }

    this.totalRevenue = total;
  }
  
  onAddClientClick() {
    this.router.navigate(['/add-client']);
  }

  onRowSelect(event) {
    console.log(event);
    this.confirmationService.confirm({
      message: 'View details of "'+event.data._id+'" ?',
      accept: () => {
        this.router.navigate(['/client-detail/'+event.data._id]);
      }
    });
  }
  
}
