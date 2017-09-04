import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }
  
  onViewClientsClick() {
    this.router.navigate(['/clients']);
  }

  onViewProductsClick() {
    this.router.navigate(['/products']);
  }

  onViewOrdersClick() {
    this.router.navigate(['/client-orders']);
  }

  onViewVendorOrdersClick() {
    this.router.navigate(['/vendor-orders']);
  }

  onViewCouponsClick() {
    this.router.navigate(['/coupons']);
  }
}
