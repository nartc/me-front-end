import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { ClientService } from '../../services/client.service';
import { Message } from 'primeng/primeng';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public email: string = '';
  public password: string = '';
  public role: string = 'Client';

  public loginMessages: Array<Message> = [];

  constructor(
    public router: Router,
    public httpService: HttpService,
    public authService: AuthService,
    public flashMessagesService: FlashMessagesService,
    public clientService: ClientService
  ) { }

  ngOnInit() {
  }

  onLoginSubmit(): void{
    const user = {
      email: this.email,
      password: this.password
    };

    if(this.role == 'Admin') {
      this.authService.authenticateAdmin(user).subscribe(
        (data: any): void => {
          if(data.success) {
            this.authService.storeAdminData(data.token, data.admin);
            this.flashMessagesService.show(
              'You are logged in',
              {
                cssClass: 'ui-messages-info',
                timeout: 3000
              }
            );
            this.router.navigate(['/dashboard/'+data.admin.role+'/'+data.admin._id]);
          } else {
            this.loginMessages = [];
            this.loginMessages.push({
              severity: 'error',
              summary: 'Login Error',
              detail: data.msg
            });
            this.router.navigate(['/login']);
          }
        }, 
        (err: Error): void => {
          console.log(err);
        }
      );
    } else if(this.role == 'Client') {
      this.clientService.authenticateClient(user).subscribe(
        (data: any): void => {
          console.log(data);
          if(data.success) {
            this.clientService.storeClientData(data.token, data.client);
            this.flashMessagesService.show(
              'You are logged in',
              {
                cssClass: 'ui-messages-info',
                timeout: 3000
              }
            );
            this.router.navigate(['/dashboard/'+data.client.role+'/'+data.client._id]);
          } else {
            this.loginMessages = [];
            this.loginMessages.push({
              severity: 'error',
              summary: 'Login Error',
              detail: data.msg
            });
            this.router.navigate(['/login']);
          }
        }, 
        (err: Error): void => {
          console.log(err);
        }
      );
    }
  }

  onClientClick(event) {
    this.role = 'Client';
    console.log(this.role);
  }

  onAdminClick(event) {
    this.role = 'Admin';
    console.log(this.role);
  }

}
