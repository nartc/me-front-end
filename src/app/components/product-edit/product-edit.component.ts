import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MenuItem, ConfirmationService, SelectItem } from 'primeng/primeng';
import { ProductService } from '../../services/product.service';
import { FlashMessagesService} from 'angular2-flash-messages';
import { Validators,FormControl,FormGroup,FormBuilder } from '@angular/forms';

import { Product } from '../../models/product';
@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  
  public id: string;
  public _id: string;
  public product: Product;
  public editProductForm: FormGroup;
  public units: Array<SelectItem>;
  public changeImage: boolean;

  constructor(
    public router: Router,
    public aRoute: ActivatedRoute,
    public productService: ProductService,
    public fB: FormBuilder,
    public confirmationService: ConfirmationService,
    public flashMessagesService: FlashMessagesService
  ) {
    this.changeImage = false;
   }

  ngOnInit() {
    //Get ID
    this.id = this.aRoute.snapshot.params['id'];

    //Get Product by Product Number
    this.productService.getProductByProductNumber(this.id).subscribe(
      (data: any): void => {
        if(data.success) {        
          this.product = data.product;
          this._id = this.product._id;
        }
      }
    );
    
    //Build Edit form
    this.editProductForm = this.fB.group(
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
    this.router.navigate(['/product-detail/'+this.id]);
  }

  onEditProductSubmit(value) {
    console.log(this.changeImage);
    this.product = value;
    this.confirmationService.confirm({
      message: 'Are you sure to make edit to this product?',
      accept: () => {
        console.log(this.changeImage);
        if(this.changeImage) {
          
          console.log('I am in here even though changeImage is false');
    
          let img = value.productDetails.image[0];
          let reader = new FileReader();
    
          reader.onloadend = () => {
            value.productDetails.image[0] = reader.result;
            this.product.productDetails.image = reader.result;
    
            this.updateProduct(this._id, this.product);
          }
    
          reader.readAsDataURL(img);
        } else {
          
          console.log('I am in here as I should be');
          this.updateProduct(this._id, this.product);
        }
      }
    });
  }

  onChange(event) {
    this.changeImage = true;
  }

  updateProduct(id: string, product: Product) {
    this.productService.updateProduct(id, product).subscribe(
      (data: any): void => {
        if(data.success) {
          this.flashMessagesService.show(
            'Product Info Updated',
            {
              cssClass: 'ui-messages-info',
              timeout: 3000
            }
          );
          this.router.navigate(['/product-detail/'+this.id]);
        } else {
          this.flashMessagesService.show(
            'Product Info Update Failed',
            {
              cssClass: 'ui-messages-danger',
              timeout: 3000
            }
          );
          this.router.navigate(['/edit-product/'+this.id]);
        }
      }
    );
  }

}
