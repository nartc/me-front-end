import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router, ActivatedRoute, Params } from '@angular/router'; 
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
  public carts: Array<CartEntry>;
  public product: Product;
  public products: Array<Product>;
  public quantitySelect: Array<Number>=[];

  public randomGeneratedString: string;

  public selectedProduct: Product;

  public displayDetailDialog: boolean;
  public displayAddToCartDialog: boolean;

  constructor(
    public productService: ProductService,
    public aRoute: ActivatedRoute,
    public cartService: CartService,
    public localStorageService: LocalStorageService,
    public router: Router
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

    this.cartService.getCartEntryByProductProductNumber(product.productNumber)
      .then(function(cartEntry: CartEntry){
        this.cartService.addProductToCart(product, quantitySelect);
      }.bind(this));
    
    
    setTimeout(()=>{
      this.cartService.getAllCartEntries()
      .then((cartEntries) => {
        this.carts = cartEntries;
      });
    }, 1000);
  }

  onTestClick() {
  }

  onQuantitySpinnerBlur(event) {
    console.log(event.target);
  }

  onGoToCartClick() {
    this.randomGeneratedString = this.genIdString();
    setTimeout(() => {
      this.router.navigate(['/cart/'+this.role+'/'+this.randomGeneratedString]);
    }, 500)
  }

  genIdString() {
    const identifier = "MEC";
    const identifierVendor = "VEN"
    const possibleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    var Id = '';

    for(var i = 0; i < 9; i++) {
      Id += possibleChars.charAt(Math.random() * possibleChars.length);
    };
    
    if(this.role == 'Client') {
      Id = identifier + "-" + Id;
    } else if(this.role == 'Admin') {
      Id = identifierVendor + "-" + Id;
    }    

    return Id;
  }
}
