import { Injectable } from '@angular/core';
import { SERVER_ADDRESS } from 'src/app/globals';

@Injectable({
  providedIn: 'root',
})
export class UrlProviderService {
  private static serverAddress = SERVER_ADDRESS;
  private static _api = '/api';

  public static get products() {
    return this.serverAddress + this._api + '/products';
  }
  public static get categories() {
    return this.serverAddress + this._api + '/categories';
  }
  public static get login() {
    return this.serverAddress + '/auth/login';
  }
  public static get register() {
    return this.serverAddress + '/auth/register';
  }
  public static get users() {
    return this.serverAddress + this._api + '/users';
  }
  public static get image() {
    return this.serverAddress + this._api + '/images';
  }
  public static get shoppingCart() {
    return this.serverAddress + this._api + '/shopping-cart';
  }
  public static get order() {
    return this.serverAddress + this._api + '/orders';
  }
  public static get orderDetails() {
    return this.serverAddress + this._api + '/orderDetails';
  }
  constructor() { }
}
