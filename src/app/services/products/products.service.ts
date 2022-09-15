import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../wrappers/product';

import { UrlProviderService } from '../urlProvider/url-provider.service';
import { ProductAdd } from '../../wrappers/product-add';
import { ProductPage } from '../../wrappers/product-page';
import { CATEGORY_ALL } from 'src/app/globals';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private httpClient: HttpClient) { }

  public getFiltered(offset: number, itemsOnPage: number, category: string, productName: string, unitPriceMin: number, unitPriceMax: number): Observable<ProductPage> {
    let url = UrlProviderService.products + '/filtered'+ '?offset=' + offset + '&itemsOnPage=' + itemsOnPage + '&productName=' + productName + 
      '&unitPriceMin=' + unitPriceMin + '&unitPriceMax=' + unitPriceMax;
    if (category !== CATEGORY_ALL) {
      url += '&category=' + category;
    }
    return this.httpClient.get<ProductPage>(
      url 
    );
  }

  getAll(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(UrlProviderService.products + '/all');
  }

  add(productAdd: ProductAdd): Observable<Product> {
    return this.httpClient.post<Product>(
      UrlProviderService.products + '/add',
      productAdd,
      { headers: this.getAuthorizationHeader() }
    );
  }

  delete(product: Product) {
    return this.httpClient.delete(
      UrlProviderService.products + '/del/' + product.id,
      { headers: this.getAuthorizationHeader() }
    );
  }

  update(product: ProductAdd) {
    return this.httpClient.put(
      UrlProviderService.products + '/upd',
      product,
      { headers: this.getAuthorizationHeader() }
    );
  }

  private getAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('access_token')}`
    );
  }
}
