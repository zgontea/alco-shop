import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../../wrappers/category';
import { Observable } from 'rxjs';
import { Product } from '../../wrappers/product';

import { UrlProviderService } from '../urlProvider/url-provider.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private httpClient: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(
      UrlProviderService.categories + '/all'
    );
  }

  getProductsByCategoryName(categoryName: string): Observable<Product[]> {
    return this.httpClient.get<Product[]>(
      UrlProviderService.categories +
        '/categoryName?' +
        'categoryName=' +
        categoryName
    );
  }
}
