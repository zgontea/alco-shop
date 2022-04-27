import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../wrappers/category';
import { Observable } from 'rxjs';
import { Product } from '../wrappers/product';
import { HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(
      'http://localhost:8090/api/categories/all'
    );
  }

  getProductsByCategoryName(categoryName: string): Observable<Product[]> {
    return this.httpClient.get<Product[]>('http://localhost:8090/api/categories/categoryName?' + 'categoryName=' + categoryName);
  }
}
