import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BAD_REQUEST_ERROR, CLOSE_BUTTON, NO_ACCESS_ERROR } from 'src/app/globals';
import { ProductsService } from 'src/app/services/products/products.service';
import { HttpErrorHandler } from 'src/app/utils/http-error-handler';
import { SnackBarNotificationUtil } from 'src/app/utils/snack-bar-notification-util';
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
export class ProductListComponent extends HttpErrorHandler implements OnInit  {
  @ViewChild(MatTable) table!: MatTable<ProductWrapper>;
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
      columnDef: 'actionDelete',
      header: '',
      cell: () => {},
    },
    {
      columnDef: 'actionEdit',
      header: '',
      cell: () => {},
    },
  ];

  dataSource: ProductWrapper[] = [];
  displayedColumns = this.columns.map((c) => c.columnDef);

  constructor(
    private productsService: ProductsService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {
    super();
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productsService.getAll().subscribe({
      next: (data : any) => {
        this.products = data;
        console.log(data.length);

        for (let index = 0; index < data.length; index++) {
          const wrapper: ProductWrapper = {
            position: index + 1,
            data: data[index],
          };
          this.dataSource.push(wrapper);
        }
      },
      error: (error: HttpErrorResponse) => {
        this.handleError(error, this.snackBar);
      },
      complete: () => {
        this.table.renderRows();
      },
    });
  }

  openDialog() {
    this.dialog.open(AddProductComponent);
  }

  onDelete(product: ProductWrapper) {
    this.productsService.delete(product.data).subscribe({
      next: () => {
        SnackBarNotificationUtil.showSnackBarSuccess(
          this.snackBar,
          'Produkt został usunięty pomyślnie',
          CLOSE_BUTTON
        )
          .afterDismissed()
          .subscribe(() => {
            this.getProducts();
          });
      },
      error: (error: HttpErrorResponse) => {
        this.handleError(error, this.snackBar);
      },
      complete: () => {},
    });
  }

  onEdit(product: ProductWrapper) {
    this.productsService.update(product.data).subscribe({
      next: () => {
        SnackBarNotificationUtil.showSnackBarSuccess(
          this.snackBar,
          'Produkt został zaktualizowany pomyślnie',
          CLOSE_BUTTON
        )
          .afterDismissed()
          .subscribe(() => {
            this.getProducts();
          });
      },
      error: (error: HttpErrorResponse) => {
        this.handleError(error, this.snackBar);
      },
      complete: () => {},
    });
  }
}
