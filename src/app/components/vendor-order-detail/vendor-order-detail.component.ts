import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { VendorOrderService } from '../../services/vendor-order.service';
import { ConfirmationService } from 'primeng/primeng';

import { VendorOrder } from '../../models/vendorOrder';
import { Product } from '../../models/product';

@Component({
  selector: 'app-vendor-order-detail',
  templateUrl: './vendor-order-detail.component.html',
  styleUrls: ['./vendor-order-detail.component.scss']
})
export class VendorOrderDetailComponent implements OnInit {

  public vendorOrder: VendorOrder;
  public vendorOrderNumber: string;
  public product: Product;

  constructor(
    public vendorOrderService: VendorOrderService,
    public confirmationService: ConfirmationService,
    public router: Router,
    public aRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    //Get Vendor Order Number
    this.vendorOrderNumber = this.aRoute.snapshot.params['id'];

    //Get Vendor Order by Vendor Order Number
    this.vendorOrderService.getVendorOrderByVendorOrderNumber(this.vendorOrderNumber).subscribe(
      (data: any): void => {
        console.log(data);
        this.vendorOrder = data.vendorOrder;
      }
    );
  }

  onClick() {
      this.router.navigate(['/vendor-orders']);
  }

  onShowDetailsClick(item) {
    console.log(item);
    this.product = item.product;
  }

  onEditProductClick() {
    setTimeout(() => {
      this.router.navigate(['/edit-product/'+this.product.productNumber]);
    }, 1000)
  }

}
