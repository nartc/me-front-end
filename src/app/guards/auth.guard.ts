import {Injectable} from '@angular/core';
import { ActivatedRoute, CanActivate, GuardsCheckEnd, NavigationCancel, Router } from '@angular/router';
import {AuthService} from '../services/auth.service';
import {ClientService} from '../services/client.service';
import 'rxjs/add/operator/filter';

@Injectable()
export class AuthGuard implements CanActivate{
  private params: any;
  constructor(
      private authService:AuthService, 
      private router:Router,
      private clientService: ClientService,
      private aRoute: ActivatedRoute
    ){
      // this.router.events.filter(event => event instanceof NavigationCancel)
      //   .subscribe(
      //     (e: NavigationCancel) => {
      //       console.log(e.url.split("?"));
      //     }
      //   )

      // this.router.events
      //   .filter(event => event instanceof GuardsCheckEnd)
      //   .subscribe((e: GuardsCheckEnd) => {
      //    (async () => {
      //       if(e.id === 1) {
      //         let params = await e.state.root.queryParams;
      //         console.log(params);
      //       }
      //    })();
         
      //   });

  }

  canActivate(){
    if(this.authService.isLoggedIn() || this.clientService.isLoggedIn()){
      return true;
    } else  {
      this.router.events.filter(event => event instanceof GuardsCheckEnd)
        .subscribe(
          (e: GuardsCheckEnd) => {
            (async () => {
              if(e.id === 1) {
                this.params = await e.state.root.queryParams;
              }
            })()
            .then(
              () => {
                this.router.navigate(['/login'], {queryParams: this.params, queryParamsHandling: "merge"})
              }
            );
          }
        );  
      return false;
    }
  }
}