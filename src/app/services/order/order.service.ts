import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderWrapper } from 'src/app/wrappers/order';
import { OrderDetails } from 'src/app/wrappers/order-details';
import { UrlProviderService } from '../urlProvider/url-provider.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private httpClient: HttpClient) {}

  addOrder(order: OrderWrapper): Observable<OrderWrapper> {
    return this.httpClient.post<OrderWrapper>(
      UrlProviderService.order + '/save',
      order,
      { headers: this.authHeader }
    );
  }

  getAllOrders(order: OrderWrapper): Observable<OrderWrapper> {
    return this.httpClient.post<OrderWrapper>(
      UrlProviderService.order + '/save',
      order,
      { headers: this.authHeader }
    );
  }

  getUserOrderDetails(userId: string): Observable<OrderDetails[]> {
    return this.httpClient.get<OrderDetails[]>(
      UrlProviderService.order + '/id' + '?userId=' + userId,
      { headers: this.authHeader }
    );
  }

  getUserOrders(userId: string): Observable<OrderWrapper[]> {
    return this.httpClient.get<OrderWrapper[]>(
      UrlProviderService.order + '/userOrder' + '?userId=' + userId,
      { headers: this.authHeader }
    );
  }

  submitOrder(order: OrderWrapper): Observable<OrderWrapper> {
    return this.httpClient.post<OrderWrapper>(
      UrlProviderService.order + '/sendOrder',
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
