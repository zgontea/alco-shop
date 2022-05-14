import { Component, OnInit } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { CategoryService } from '../../services/category/category.service';
import { ProductsService } from '../../services/products/products.service';
import { Category } from '../../wrappers/category';
import { Product } from '../../wrappers/product';
import {query} from "@angular/animations";
@Component({
  selector: 'app-products-view',
  templateUrl: './products-view.component.html',
  styleUrls: ['./products-view.component.scss'],
})

export class ProductsViewComponent implements OnInit{

  public _products: Product[] = [];
  public _categories: Category[] = [];
  public test ='';
  value = '';
  value2 = '';
  query = '';
  currentPage = 0;
  totalPages = 0;
  currentCategory = 'Wszystko';

  constructor(private productsService: ProductsService, private categoryService: CategoryService) {

   }

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
    this.fetchPage(this.currentPage);
  }

  fetchPage(pageNumber: number): void {
    this.productsService.getProductPage(pageNumber).subscribe(
      response => {
        this.products = response.items;
        this.totalPages = response.totalPages;
      });
  }

  onPageChanged(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.fetchPage(this.currentPage);
  }

  onChange(event: MatRadioChange) {
    if (event.source.value == "Wszystko") {
      this.fetchPage(this.currentPage);
    }
    else {
      this.getProductsByCatName(event.source.value)
    }
    this.currentCategory = event.source.value;
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
    if (this.value) {
      this._products.filter(product => {
        product.unitPrice >= Number(this.value)
          && product.unitPrice <= Number(this.value2)
      })
    }
  }

  public getCategories(): void {
    this.categoryService
      .getCategories()
      .subscribe((value) => (this._categories = value));
  }

  public searchFunction(): void {
    if( this.query === '')
    {
      this.fetchPage(this.currentPage);
      return;
    }
    this.getProducts();

  }

  public clearFunction(): void {
    this.fetchPage(this.currentPage);
    this.query = '';
  }

  toggleShow() {
    // let len = this._products.length;
    // for(let i = 0; i<len; i++)
    // {
    //   let productCard = document.getElementById(this._products[i].name)!;
    //   productCard.hidden = false;
    // }

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

