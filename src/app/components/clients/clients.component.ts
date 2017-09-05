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
        }
      }
    );
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
