import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Params } from '@angular/router'; 

import { Product } from '../../models/product';

@Component({
  selector: 'app-product-sale',
  templateUrl: './product-sale.component.html',
  styleUrls: ['./product-sale.component.scss']
})
export class ProductSaleComponent implements OnInit {
  
  public role: string;
  public product: Product;
  public products: Array<Product>;

  constructor(
    public productService: ProductService,
    public aRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    //Get Role
    this.role = this.aRoute.snapshot.params['role'];

    //Get all Products
    this.productService.getProducts().subscribe(
      (data: any): void => {
        this.products = data.products;
      }
    );
  }

  displayDetail(product: Product) {
    console.log(product);
  }

  addToCartClick(product: Product) {
    console.log(product);
  }

  onQuantitySpinnerBlur(event) {
    console.log(event.target.value);
  }
}
