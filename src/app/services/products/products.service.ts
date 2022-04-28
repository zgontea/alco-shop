import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../wrappers/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private httpClient: HttpClient) {}
  
  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(
      'http://25.50.55.41:8090/api/products/all'
    );
  }
}
