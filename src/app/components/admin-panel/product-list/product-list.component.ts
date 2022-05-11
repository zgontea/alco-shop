import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductsService } from 'src/app/services/products/products.service';
import { Product } from 'src/app/wrappers/product';
import { AddProductComponent } from '../add-product/add-product.component';

export interface ProductWrapper {
  position: number;
  data: Product;
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  columns = [
    {
      columnDef: 'position',
      header: 'No.',
      cell: (element: ProductWrapper) => `${element.position}`,
    },
    {
      columnDef: 'name',
      header: 'Nazwa',
      cell: (element: ProductWrapper) => `${element.data.name}`,
    },
    {
      columnDef: 'description',
      header: 'Opis',
      cell: (element: ProductWrapper) => `${element.data.description}`,
    },
    {
      columnDef: 'unitPrice',
      header: 'Cena',
      cell: (element: ProductWrapper) => `${element.data.unitPrice}`,
    },
    {
      columnDef: 'size',
      header: 'Pojemnosć',
      cell: (element: ProductWrapper) => `${element.data.size}`,
    },
    {
      columnDef: 'concentration',
      header: 'Zawartość alkoholu',
      cell: (element: ProductWrapper) => `${element.data.concentration}`,
    },
    {
      columnDef: 'actions',
      header: '',
      cell: () => {},
    },
  ];

  dataSource: ProductWrapper[] = [];
  displayedColumns = this.columns.map((c) => c.columnDef);
  
  constructor(private productsService: ProductsService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productsService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        console.log(data.length);
        
        for (let index = 0; index < data.length; index++) {
          const wrapper: ProductWrapper = {
            position: index + 1,
            data: data[index],
          };
          console.log(wrapper);
          
          this.dataSource.push(wrapper);
        }
      },
      error: (error) => {
        console.log('Error loading products');
      },
      complete: () => {},
    });
  }

  openDialog() {
    this.dialog.open(AddProductComponent);
  }
}
