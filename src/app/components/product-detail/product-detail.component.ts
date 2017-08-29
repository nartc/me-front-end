import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ConfirmationService, MenuItem } from 'primeng/primeng';
import { FlashMessagesService } from 'angular2-flash-messages';

import { Product } from '../../models/product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  
  public id: string;
  public _id: string;
  public product: Product;
  public buttonItems: Array<MenuItem> = [];
  public outOfStock: boolean = false;

  constructor(
    public router: Router,
    public aRoute: ActivatedRoute,
    public productService: ProductService,
    public confirmationService: ConfirmationService,
    public flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
    //Get Id (Product Number)
    this.id = this.aRoute.snapshot.params['id'];
    console.log(this.id);

    //Get Product by Product Number
    this.productService.getProductByProductNumber(this.id).subscribe(
      (data: any): void => {
        if(data.success) {
          if(data.product.inStock <= 0) {
            this.outOfStock = true;
          } else {
            this.outOfStock = false;
          }
          
          this.product = data.product;
          this._id = this.product._id;

        }
      }
    );

    //Context Menu
    this.buttonItems = [
      {
        label: 'Edit',
        icon: 'fa-wrench',
        command: () => {
          this.router.navigate(['/edit-product/'+this.id]);
        }
      },
      {
        label: 'Delete',
        icon: 'fa-close',
        command: () => {
          this.confirmationService.confirm({
            message: 'This action will permanently delete Object "'+this.id+'". Do you want to proceed?',
            accept: () => {
              this.productService.deleteProduct(this._id).subscribe(
                (data: any): void => {
                  if(data.success) {
                    this.flashMessagesService.show(
                      'Product deleted',
                      {
                        cssClass: 'ui-messages-info',
                        timeout: 3000
                      }
                    );
                    this.router.navigate(['/products']);
                  } else {
                    this.flashMessagesService.show(
                      data.msg,
                      {
                        cssClass: 'ui-messages-info',
                        timeout: 3000
                      }
                    );
                    this.router.navigate(['/product-detail/'+this.id]);
                  }
                }
              );
            }
          });
        }
      }
    ];
  }

  onClick() {
    this.router.navigate(['/products']);
  }

}
