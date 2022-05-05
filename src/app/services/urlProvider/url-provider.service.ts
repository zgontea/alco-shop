import { Injectable } from '@angular/core';
import { serverAddress } from 'src/app/globals';

@Injectable({
  providedIn: 'root',
})
export class UrlProviderService {
  private static serverAddress = serverAddress;
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
  constructor() {}
}
