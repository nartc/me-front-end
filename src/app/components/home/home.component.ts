import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    public router: Router,
    public authService: AuthService,
    public clientService: ClientService
  ) { }

  ngOnInit() {
  }

  onClick() {
    this.router.navigate(['/register']);
  }

}
