import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {ClientService} from '../services/client.service';

@Injectable()
export class AuthGuard implements CanActivate{
  constructor(
      private authService:AuthService, 
      private router:Router,
      private clientService: ClientService
    ){

  }

  canActivate(){
    if(this.authService.isLoggedIn() || this.clientService.isLoggedIn()){
      return true;
    } else  {
      this.router.navigate(['/login']);
      return false;
    }
  }
}