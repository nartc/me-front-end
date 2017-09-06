import {Injectable,OnInit} from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {ClientService} from '../services/client.service';

@Injectable()
export class AdminGuard implements  OnInit,CanActivate{

    public role: string;
    
  constructor(
      private authService:AuthService, 
      private clientService: ClientService,
      private router:Router
    ){ 
        if(this.authService.currentAdmin) {
            this.role = this.authService.currentAdmin.role;
        } else if (this.clientService.currentClient) {
            this.role = this.clientService.currentClient.role;
        }
    
        console.log(this.role);
    }

ngOnInit(){
    
}
 

canActivate(){
if(this.role == 'Admin')
    {
      return true;   
    } else if(this.role == 'Client')
    {
            this.router.navigate(['/dashboard/'+this.role+'/'+this.clientService.currentClient._id]);
            return false;
    }
  }
  
}