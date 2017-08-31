import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Params } from '@angular/router'; 
import { CartService } from '../../services/cart.service';
import { LocalStorageService } from '../../services/local-storage.service';

import { CartEntry } from '../../models/cart';
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
  public quantitySelect: Array<Number>=[];

  public selectedProduct: Product;

  public displayDetailDialog: boolean;
  public displayAddToCartDialog: boolean;

  constructor(
    public productService: ProductService,
    public aRoute: ActivatedRoute,
    public cartService: CartService,
    public localStorageService: LocalStorageService
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

    //Init Cart
    this.cartService.initCart();
  }

  displayDetail(product: Product) {
    this.selectedProduct = product;
    this.displayDetailDialog = true;
  }

  addToCartClick(product: Product, quantitySelect: any) {
    console.log(product);
    console.log(quantitySelect);

    this.cartService.getCartEntryByProductId(product._id)
      .then(function(cartEntry: CartEntry){
        this.cartService.addProductToCart(product, quantitySelect);
      }.bind(this));

  }

  onQuantitySpinnerBlur(event) {
    console.log(event.target);
  }
}
