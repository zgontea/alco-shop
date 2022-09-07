import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../wrappers/product';

import { UrlProviderService } from '../urlProvider/url-provider.service';
import {ProductAdd} from "../../wrappers/product-add";
import {ProductPage} from "../../wrappers/product-page";


@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private httpClient: HttpClient) { }

  public getProductPage(pageNumber: number): Observable<ProductPage> {
    let header = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    console.log(`Bearer ${localStorage.getItem('access_token')}`);

    return this.httpClient.get<ProductPage>(
      UrlProviderService.products + "/pages/" + pageNumber,{ headers: header }
    );

  }

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

  delProducts(product: Product){
    let header = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    return this.httpClient.delete(
      UrlProviderService.products + '/del/' + product.id, { headers: header });
  }

  getAuthorizationHeader(): any {

  }
}
