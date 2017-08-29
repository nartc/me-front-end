import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { MenuItem, ConfirmationService } from 'primeng/primeng';
import { FlashMessagesService } from 'angular2-flash-messages';

import { Client } from '../../models/client';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss']
})
export class ClientDetailComponent implements OnInit {
  
  public buttonItems: Array<MenuItem> = [];

  public id: string;
  public client: Client;
  public hasBalance: boolean = false;

  constructor(
    public router: Router,
    public aRoute: ActivatedRoute,
    public clientService: ClientService,
    public confirmationService: ConfirmationService,
    public flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
    //Get ID
    this.id = this.aRoute.snapshot.params['id'];
    console.log(this.id);
    
    //Get Client by Id
    this.clientService.getClientById(this.id).subscribe(
      (data: any): void => {
        if(data.client.balance > 0) {
          this.hasBalance = true;
        } else {
          this.hasBalance = false;
        }
        this.client = data.client;
      }
    );

    //Context Menu
    this.buttonItems = [
      {
        label: 'Edit',
        icon: 'fa-wrench',
        command: () => {
          this.router.navigate(['/edit-client/'+this.id]);
        }
      },
      {
        label: 'Delete',
        icon: 'fa-close',
        command: () => {
          this.confirmationService.confirm({
            message: 'This action will permanently delete Object "'+this.id+'". Do you want to proceed?',
            accept: () => {
              this.clientService.deleteClient(this.id).subscribe(
                (data: any): void => {
                  if(data.success) {
                    this.flashMessagesService.show(
                      'Client deleted',
                      {
                        cssClass: 'ui-messages-info',
                        timeout: 3000
                      }
                    );
                    this.router.navigate(['/clients']);
                  } else {
                    this.flashMessagesService.show(
                      data.msg,
                      {
                        cssClass: 'ui-messages-info',
                        timeout: 3000
                      }
                    );
                    this.router.navigate(['/client/'+this.id]);
                  }
                }
              );
            }
          });
        }
      }
    ];

  }

  onClick() {
    this.router.navigate(['/clients']);
  }

}
