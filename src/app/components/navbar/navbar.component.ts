import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { ClientService } from "../../services/client.service";
import { Router } from "@angular/router";
import { MenuItem, ConfirmationService } from "primeng/primeng";
import { FlashMessagesService } from 'angular2-flash-messages';

import { Client } from '../../models/client';
import { Admin } from '../../models/admin';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public menuItems: Array<MenuItem> = [];

  public client: Client;
  public admin: Admin;

  constructor(
    public authService: AuthService,
    public clientService: ClientService,
    public flashMessagesService: FlashMessagesService,
    public confirmationService: ConfirmationService,
    public router: Router
  ) {  }

  ngOnInit() {
    this.menuItems = [
      {
        label: 'Manage',
        items: [
          {
            label: 'Change Password',
            icon: 'fa-wrench',
            command: (event: any): void => {
              this.router.navigate(['/password']);
            }
          },
          {
            label: 'Log Out',
            icon: 'fa-minus',
            command: (event: any): void => {
              this.onLogoutClick();
            }
          }
        ]
      }
    ];
  }

  onLogoutClick() {
    this.confirmationService.confirm({
      message: 'Are you sure to log out?',
      key: "navConfirm",
      accept: () => {
        if(this.clientService.currentClient) {
          this.clientService.logout();
          this.flashMessagesService.show(
            'Logged Out (Client)',
            {
              cssClass: 'ui-messages-info',
              timeout: 3000
            }
          );
          this.router.navigate(['/login']);
        }
        if(this.authService.currentAdmin) {
          this.authService.logout();
          this.flashMessagesService.show(
            'Logged Out (Admin)',
            {
              cssClass: 'ui-messages-info',
              timeout: 3000
            }
          );
          this.router.navigate(['/login']);
        }

      }
    });
    return false;
  }

  loadCurrentUser(): void {
    this.admin = this.authService.currentAdmin;
    this.client = this.clientService.currentClient;
    
    console.log(this.admin);
    console.log(this.client);
  }

}
