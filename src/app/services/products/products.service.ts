import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../wrappers/product';

import { UrlProviderService } from '../urlProvider/url-provider.service';
import {ProductAdd} from "../../wrappers/product-add";


@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private httpClient: HttpClient) { }

  getProducts(): Observable<Product[]> {
    let header = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    console.log(`Bearer ${localStorage.getItem('access_token')}`);

    return this.httpClient.get<Product[]>(
      UrlProviderService.products + '/all', { headers: header }
    );
  }

  addProducts(productAdd : ProductAdd): Observable<Product> {
    let header = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    return this.httpClient.post<Product>(
      UrlProviderService.products + '/add', productAdd, { headers: header });
  }
}
