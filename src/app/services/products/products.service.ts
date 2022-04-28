import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../wrappers/product';

import { UrlProviderService } from '../urlProvider/url-provider.service';


@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private httpClient: HttpClient) {}
  
  getProducts(): Observable<Product[]> {
    let header = new HttpHeaders().set('Authorization',  `Bearer ${localStorage.getItem('access_token')}`);
    return this.httpClient.get<Product[]>(
      UrlProviderService.products + '/all', header
    );
    // TODO
    // Poprawienie zapytania zeby dawalo header z tokenem
  }
}
