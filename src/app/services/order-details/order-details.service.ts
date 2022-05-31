import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderDetails } from 'src/app/wrappers/order-details';
import { UrlProviderService } from '../urlProvider/url-provider.service';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailsService {

  constructor(private httpClient: HttpClient) { }

  addOrder(orderDetails: OrderDetails): Observable<OrderDetails> {
    let header = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    return this.httpClient.post<OrderDetails>(UrlProviderService.orderDetails + "/save", orderDetails, { headers: header });
  }
}
