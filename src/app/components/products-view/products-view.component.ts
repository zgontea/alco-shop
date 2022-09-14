import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatRadioChange } from '@angular/material/radio';
import { CategoryService } from '../../services/category/category.service';
import { ProductsService } from '../../services/products/products.service';
import { Category } from '../../wrappers/category';
import { Product } from '../../wrappers/product';
@Component({
  selector: 'app-products-view',
  templateUrl: './products-view.component.html',
  styleUrls: ['./products-view.component.scss'],
})
export class ProductsViewComponent implements OnInit, AfterViewInit {
  public _products: Product[] = [];
  public _categories: Category[] = [];
  public test = '';
  minPrice = '';
  maxPrice = '';
  queriedProductName = '';
  currentPage = 0;
  itemsAmount = 1;
  pageSizeOptions: number[] = [3, 6, 12];
  itemsOnPage = this.pageSizeOptions[1];
  currentCategory = 'Wszystko';

  constructor(
    private productsService: ProductsService,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  ngAfterViewInit(): void {
    this.fetchPage(this.currentPage);
  }

  fetchPage(pageNumber: number): void {
    let offset = pageNumber * this.itemsOnPage;
    this.productsService.getFiltered(offset, this.itemsOnPage, this.currentCategory, this.queriedProductName, Number(this.minPrice), Number(this.maxPrice)).subscribe({
      next: (data) => {
        this.products = data.products;
        this.itemsAmount = data.itemsAmount;
      },
      complete: () => {
      }
    });
  }

  onPageChanged(event: PageEvent): PageEvent {
    this.currentPage = event.pageIndex;
    this.itemsOnPage = event.pageSize;
    this.fetchPage(this.currentPage);

    return event;
  }

  onChange(event: MatRadioChange) {
    this.currentCategory = event.source.value;
    this.currentPage = 0;
    this.fetchPage(this.currentPage);
  }

  public getCategories(): void {
    this.categoryService
      .getCategories()
      .subscribe((value) => (this._categories = value));
  }

  public searchFunction(): void {
      this.fetchPage(this.currentPage);
  }

  public clearFunction(): void {
    this.queriedProductName = '';
    this.minPrice = '';
    this.maxPrice = '';
    this.fetchPage(this.currentPage);
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
