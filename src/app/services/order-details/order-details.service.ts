import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderDetails } from 'src/app/wrappers/order-details';
import { ShoppingCartItem } from 'src/app/wrappers/shopping-cart-item';
import { UrlProviderService } from '../urlProvider/url-provider.service';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailsService {

  constructor(private httpClient: HttpClient) { }

  addOrder(shoppingCartItem: ShoppingCartItem): Observable<ShoppingCartItem> {
    let header = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    return this.httpClient.post<ShoppingCartItem>(UrlProviderService.orderDetails + "/save", shoppingCartItem, { headers: header });
  }

  deleteCartItem(orderDetailsid: number) {
    let header = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    return this.httpClient.delete(UrlProviderService.orderDetails + "/del?id=" + orderDetailsid, { headers: header });
  }
}
