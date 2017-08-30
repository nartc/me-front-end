import { Component, OnInit } from '@angular/core';
import { Validators,FormControl,FormGroup,FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Message, SelectItem } from 'primeng/primeng';
import { FlashMessagesService } from 'angular2-flash-messages';

import { Product } from '../../models/product';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {
  
  public product: Product;
  public addProductForm: FormGroup;

  public units: Array<SelectItem> = [];
  public addProductMessages: Array<Message> = [];

  public pickImage: boolean;

  constructor(
    public fB: FormBuilder,
    public router: Router,
    public productService: ProductService,
    public flashMessagesService: FlashMessagesService
  ) {
    this.pickImage = false;
  }

  ngOnInit() {
    this.addProductForm = this.fB.group(
      {
        'productDetails': this.fB.group(
          {
            'name': new FormControl(''),
            'description': new FormControl(''),
            'unit': new FormControl(''),
            'image': new FormControl('')
          }
        ),
        'productSellPrice': new FormControl(0),
        'productBuyPrice': new FormControl(0),
        'inStock': new FormControl(0)
      }
    );

    this.units = [];
    this.units.push({label: 'Each', value: 'EA'}),
    this.units.push({label: 'Box', value: 'BX'}),
    this.units.push({label: 'Case', value: 'CS'})
  }

  onClick() {
    this.router.navigate(['/products']);
  }

  onAddProductSubmit(value) {
    this.product = value;
    
    if(this.pickImage) {
      let img = value.productDetails.image[0];
      let reader = new FileReader();
      
      reader.onloadend = () => {
        console.log('RESULT', reader.result);
        value.productDetails.image[0] = reader.result;
        this.product.productDetails.image = reader.result;
        
        this.postProduct(this.product);
      }
      
      reader.readAsDataURL(img);
    } else {
      this.postProduct(this.product);
    }
  }

  postProduct(product: Product) {
    this.productService.addProduct(product).subscribe(
      (data: any): void => {
        console.log(data);
        if(data.success) {
          this.flashMessagesService.show(
            'New Product Added',
            {
              cssClass: 'ui-messages-info',
              timeout: 3000
            }
          );
          this.router.navigate(['/products']);
        } else {
          this.addProductMessages = [];
          this.addProductMessages.push({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to add new Product'
          });
          this.router.navigate(['/add-product']);
        }
      },
      (err: Error): void => {
        console.log(err);
      }
    );
  }

  onChange(event) {
    this.pickImage = true;
  }

}
