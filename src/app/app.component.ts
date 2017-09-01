import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ClientService } from './services/client.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public clientService: ClientService
  ) {
  }

  ngOnInit(): void {
    this.authService.loadCurrentAdmin();
    this.clientService.loadCurrentClient();

  }
}
