import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ConfirmationService } from 'primeng/primeng';

import { Product } from '../../models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public products: Array<Product>;
  public product: Product;

  constructor(
    public router: Router,
    public confirmationService: ConfirmationService,
    public productService: ProductService
  ) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(
      (data: any): void => {
        if(data.success) {
          this.products = data.products;
        }
      }
    );
  }

  onAddProductClick() {
    this.router.navigate(['/add-product']);
  }

  onRowSelect(event) {
    console.log(event);
    this.confirmationService.confirm({
      message: 'View details of "'+event.data.productNumber+'" ?',
      accept: () => {
        this.router.navigate(['/product-detail/'+event.data.productNumber]);
      }
    });
  }

}
