import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/wrappers/order';
import { UrlProviderService } from '../urlProvider/url-provider.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private httpClient: HttpClient) {}

  addOrder(order: Order): Observable<Order> {
    return this.httpClient.post<Order>(
      UrlProviderService.order + '/save',
      order,
      { headers: this.authHeader }
    );
  }

  getAllOrders(order: Order): Observable<Order> {
    return this.httpClient.post<Order>(
      UrlProviderService.order + '/save',
      order,
      { headers: this.authHeader }
    );
  }

  getUserOrders(order: Order): Observable<Order> {
    return this.httpClient.post<Order>(
      UrlProviderService.order + '/save',
      order,
      { headers: this.authHeader }
    );
  }

  submitOrder(order: Order): Observable<Order> {
    return this.httpClient.post<Order>(
      UrlProviderService.order + '/save',
      order,
      { headers: this.authHeader }
    );
  }

  get authHeader() {
    return new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('access_token')}`
    );
  }
}
