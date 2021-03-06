import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CartEntry } from '../models/cart';
import "rxjs/add/operator/map";
import {Observable} from "rxjs/Observable";
import { LocalStorageService } from '../services/local-storage.service';

@Injectable()
export class CartService {

  constructor(
    public localStorageService: LocalStorageService
  ) { }

  initCart() {
    
    if(!this.localStorageService.fetchValueFromKey('cart')) {
      
      let emptyMap: {[key:string]:any; } = {};
      this.localStorageService.saveValueWithKey('cart', JSON.stringify(emptyMap));
    }
  }

  saveListOfCartEntries(listOfCartEntries: Array<CartEntry>) {

    let cartMap = listOfCartEntries.reduce((map, cartEntry, i) => {
      map[cartEntry.product.productNumber] = cartEntry;
      return map;
    }, {});

    this.localStorageService.saveValueWithKey('cart', JSON.stringify(cartMap));
  }

  getCartEntryByProductProductNumber(productNumber: string) {
    let myCartMap = JSON.parse(this.localStorageService.fetchValueFromKey('cart'));
    return Promise.resolve(myCartMap[productNumber]);
  }
  
  addProductToCart(product, quantity) {


    if(quantity == undefined) {
      quantity = 1;
    }

    let cartMap = JSON.parse(this.localStorageService.fetchValueFromKey('cart'));

    if(cartMap[product.productNumber] != undefined) {
      let cartInstance = cartMap[product.productNumber];
      
      cartInstance.quantity = cartInstance.quantity + quantity;
      cartMap[product.productNumber] = cartInstance;
    } else {
      cartMap[product.productNumber] = {
        'product': product,
        'quantity': quantity
      }
    }

    this.localStorageService.saveValueWithKey('cart', JSON.stringify(cartMap));
  }

  getAllCartEntries() {
    let myCartMap = JSON.parse(this.localStorageService.fetchValueFromKey('cart'));
    let cartEntries: Array<CartEntry> = [];

    for(let key in myCartMap) {
      if(myCartMap[key].quantity > myCartMap[key].product.inStock) {
        myCartMap[key].backOrder = true;
      }

      let value = myCartMap[key];
      cartEntries.push(value);
    }

    return Promise.resolve(cartEntries);
  }




  genCartId() {
    let id = '';
    const identifier = 'MEC';
    const possibleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for(let i = 0; i < 6; i++) {
      id += possibleChars.charAt(Math.random() * possibleChars.length);
    }
  
    id = identifier + "-" + id;

    console.log(id);
  
    return id;
  }
}
