import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderService } from 'src/app/services/order/order.service';
import { ProductsService } from 'src/app/services/products/products.service';
import { Product } from 'src/app/wrappers/product';
import { ProductWrapper } from '../admin-panel/product-list/product-list.component';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  products: Product[] = [];
  dataSource: ProductWrapper[] = [];
  totalCost: number = 0;

  columns = [
    {
      columnDef: 'position',
      header: 'No.',
      footer: 'Total',
      cell: (element: ProductWrapper) => `${element.position}`,
    },
    {
      columnDef: 'name',
      header: 'Nazwa',
      footer: '',
      cell: (element: ProductWrapper) => `${element.data.name}`,
    },
    {
      columnDef: 'description',
      header: 'Opis',
      footer: '',
      cell: (element: ProductWrapper) => `${element.data.description}`,
    },
    {
      columnDef: 'size',
      header: 'Pojemnosć',
      footer: '',
      cell: (element: ProductWrapper) => `${element.data.size}`,
    },
    {
      columnDef: 'concentration',
      header: 'Zawartość alkoholu',
      footer: '',
      cell: (element: ProductWrapper) => `${element.data.concentration}`,
    },
    {
      columnDef: 'unitPrice',
      header: 'Cena',
      footer: this.totalCost,
      cell: (element: ProductWrapper) => `${element.data.unitPrice}`,
    },
    {
      columnDef: 'actions',
      header: '',
      footer: '',
      cell: () => {},
    },
  ];

  displayedColumns = this.columns.map((c: { columnDef: any }) => c.columnDef);

  constructor(
    private productsService: ProductsService,
    private orderService: OrderService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  getTotalCost(): number {
    return this.products
      .map((t) => t.unitPrice)
      .reduce((acc, value) => acc + value, 0);
  }
}
