import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product } from '../wrappers/product';

@Component({
  selector: 'app-products-view',
  templateUrl: './products-view.component.html',
  styleUrls: ['./products-view.component.scss'],
})
export class ProductsViewComponent implements OnInit {
  private _products: Product[] = [];

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  public getProducts(): void {
    this.productsService
      .getProducts()
      .subscribe((value) => (this._products = value));
  }

  public get products(): Product[] {
    return this._products;
  }

  public set products(v: Product[]) {
    this._products = v;
  }
}
