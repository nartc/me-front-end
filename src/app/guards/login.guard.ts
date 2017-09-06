import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {ClientService} from '../services/client.service';

@Injectable()
export class LoginGuard implements CanActivate{
  constructor(
      private authService:AuthService, 
      private router:Router,
      private clientService: ClientService
    ){

  }

  canActivate(){

    // return !this.authService.isLoggedIn() || !this.clientService.isLoggedIn();
      if(this.authService.isLoggedIn()) {
            console.log('logged in', this.authService.isLoggedIn())
            if(this.authService.currentAdmin) {
                this.router.navigate(['/dashboard/'+this.authService.currentAdmin.role + '/' +this.authService.currentAdmin._id]);
            } else if (this.clientService.currentClient) {
                this.router.navigate(['/dashboard/'+this.clientService.currentClient.role + '/' +this.clientService.currentClient._id]);
            }        
            return false;
      }  else  {
            console.log('not logged in');
            return true;
      }
  }

}