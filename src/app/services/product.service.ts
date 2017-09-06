import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";

import { Product } from '../models/product';

@Injectable()
export class ProductService {

  public product: Product;
  public products: Array<Product>;

  constructor(
    public httpService: HttpService
  ) { }

  addProduct(product: Product): Observable<Product> {
    return this.httpService.post('/products/addProduct', product, {'Content-Type':'application/json'});
  }

  getProducts(): Observable<Product> {
    return this.httpService.get('/products/products', {});
  }

  getProductByProductNumber(id: string): Observable<any>{
    return this.httpService.get('/products/product/'+id, {});
  }

  deleteProduct(id: string): Observable<any> {
    return this.httpService.delete('/products/delete/'+id, {});
  }

  updateProduct(id: string, product: Product): Observable<any>{
    console.log(product);
    return this.httpService.put('/products/edit/'+id, product, {'Content-Type':'application/json'});
  }

  updateProductInstock(id: string, quantity: number): Observable<any> {
    console.log(id, quantity);
    let body = {quantity}
    return this.httpService.put('/products/editInstock/'+id, body, {'Content-Type':'application/json'});
  }

}
