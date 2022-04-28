import { Component, EventEmitter, HostListener, Input, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatRadioButton, MatRadioChange } from '@angular/material/radio';
import { CategoryService } from '../services/category.service';
import { ProductsService } from '../services/products/products.service';
import { Category } from '../wrappers/category';
import { Product } from '../wrappers/product';

@Component({
  selector: 'app-products-view',
  templateUrl: './products-view.component.html',
  styleUrls: ['./products-view.component.scss'],
})
export class ProductsViewComponent implements OnInit {
  private _products: Product[] = [];
  public _categories: Category[] = [];

  constructor(private productsService: ProductsService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

  onChange(event: MatRadioChange) {
    if (event.source.value == "Wszystko") {
      this.getProducts();
    }
    else {
      this.getProductsByCatName(event.source.value)
    }
  }

  public getProductsByCatName(catName: string): void {
    this.categoryService
      .getProductsByCategoryName(catName)
      .subscribe((value) => (this._products = value));
  }

  public getProducts(): void {
    this.productsService
      .getProducts()
      .subscribe((value) => (this._products = value));
  }

  public getCategories(): void {
    this.categoryService
      .getCategories()
      .subscribe((value) => (this._categories = value));
  }

  public get category(): Category[] {
    return this._categories;
  }

  public set category(v: Category[]) {
    this._categories = v;
  }

  public get products(): Product[] {
    return this._products;
  }

  public set products(v: Product[]) {
    this._products = v;
  }
}

