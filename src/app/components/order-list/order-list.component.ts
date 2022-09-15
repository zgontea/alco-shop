import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderService } from 'src/app/services/order/order.service';
import { HttpErrorHandler } from 'src/app/utils/http-error-handler';
import { OrderWrapper } from 'src/app/wrappers/order';
import { User } from 'src/app/wrappers/user';
import { UserWrapper } from '../admin-panel/user-list/user-list.component';

export interface OrderListWrapper {
  position: number;
  data: OrderWrapper;
}

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent extends HttpErrorHandler implements OnInit {
  public orders: OrderWrapper[] = [];
  public value = '';
  columns = [
    {
      columnDef: 'position',
      header: 'No.',
      cell: (element: OrderListWrapper) => `${element.position}`,
    },
    {
      columnDef: 'createdDate',
      header: 'Data zamówenia',
      cell: (element: OrderListWrapper) => `${element.data.createdDate}`,
    },
    {
      columnDef: 'address',
      header: 'Adres',
      cell: (element: OrderListWrapper) => `${element.data.shipAddress}`,
    },
    {
      columnDef: 'city',
      header: 'Miejscowość',
      cell: (element: OrderListWrapper) => `${element.data.shipCity}`,
    },
    {
      columnDef: 'postalCode',
      header: 'Kod pocztowy',
      cell: (element: OrderListWrapper) => `${element.data.shipPostalCode}`,
    },
    {
      columnDef: 'status',
      header: 'Status',
      cell: (element: OrderListWrapper) => `${element.data.status}`,
    },
    {
      columnDef: 'totalCost',
      header: 'Wartość zamówienia',
      cell: (element: OrderListWrapper) => `${element.data.totalPrice}`,
    },
  ];
  dataSource: OrderListWrapper[] = [];
  displayedColumns = this.columns.map((c) => c.columnDef);

  constructor(
    private orderService: OrderService,
    private snackBar: MatSnackBar
  ) {
    super();
  }

  ngOnInit(): void {
    this.getMyOrders();
  }

  getMyOrders() {
    let userId = String(localStorage.getItem('user_id'));
    this.orderService.getUserOrders(userId).subscribe({
      next: (data) => {
        this.orders = data;
        this.dataSource = [];
        for (let index = 0; index < data.length; index++) {
          data[index].totalPrice = Number(data[index].totalPrice.toFixed(2));
          data[index].createdDate = this.formatDateString(
            data[index].createdDate
          );
          const wrapper: OrderListWrapper = {
            position: index + 1,
            data: data[index],
          };
          this.dataSource.push(wrapper);
        }
      },
      error: (error: HttpErrorResponse) => {
        this.handleError(error, this.snackBar);
      },
      complete: () => {},
    });
  }

  formatDateString(date: string): string {
    let dateToFormat = new Date(date);
    return (
      dateToFormat.getDay().toString().padStart(2, '0') +
      '.' +
      dateToFormat.getMonth().toString().padStart(2, '0') +
      '.' +
      dateToFormat.getFullYear() +
      ' ' +
      dateToFormat.getHours().toString().padStart(2, '0') +
      ':' +
      dateToFormat.getMinutes().toString().padStart(2, '0')
    );
  }
}
