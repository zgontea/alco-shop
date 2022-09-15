import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CLOSE_BUTTON } from 'src/app/globals';
import { OrderDetailsService } from 'src/app/services/order-details/order-details.service';
import { OrderService } from 'src/app/services/order/order.service';
import { HttpErrorHandler } from 'src/app/utils/http-error-handler';
import { SnackBarNotificationUtil } from 'src/app/utils/snack-bar-notification-util';
import { OrderWrapper } from 'src/app/wrappers/order';
import { OrderDetails } from 'src/app/wrappers/order-details';
import { ShoppingCartItemView } from 'src/app/wrappers/shopping-cart-item-view';
import { User } from 'src/app/wrappers/user';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent extends HttpErrorHandler implements OnInit {
  orderDetails: OrderDetails[] = [];
  dataSource: ShoppingCartItemView[] = [];
  totalCost!: string;

  isLoaded = false;
  isPayActionDisabled = true;

  name: string = '';
  surname: string = '';
  email: string = '';
  phoneNumber: string = '';
  address: string = '';
  city: string = '';
  postalCode: string = '';

  columns = [
    {
      columnDef: 'position',
      header: '#',
      footer: '',
      cell: (element: ShoppingCartItemView) => `${element.position}`,
    },
    {
      columnDef: 'name',
      header: 'Nazwa',
      footer: '',
      cell: (element: ShoppingCartItemView) => `${element.productData.name}`,
    },
    {
      columnDef: 'description',
      header: 'Opis',
      footer: 'Wartość całkowita zamówienia:',
      cell: (element: ShoppingCartItemView) =>
        `${element.productData.description}`,
    },
    {
      columnDef: 'size',
      header: 'Pojemnosć',
      footer: '',
      cell: (element: ShoppingCartItemView) => `${element.productData.size}`,
    },
    {
      columnDef: 'concentration',
      header: 'Zawartość alkoholu',
      footer: '',
      cell: (element: ShoppingCartItemView) =>
        `${element.productData.concentration}`,
    },
    {
      columnDef: 'unitPrice',
      header: 'Cena za sztukę',
      footer: '',
      cell: (element: ShoppingCartItemView) =>
        `${element.productData.unitPrice}`,
    },
    {
      columnDef: 'quantity',
      header: 'Ilość',
      footer: '',
      cell: (element: ShoppingCartItemView) =>
        `${element.orderDetail.quantity}`,
    },
    {
      columnDef: 'totalPrice',
      header: 'Łącznie',
      footer: this.totalCost,
      cell: (element: ShoppingCartItemView) =>
        `${element.orderDetail.totalPrice}`,
    },
    {
      columnDef: 'actions',
      header: '',
      footer: '',
      cell: (element: ShoppingCartItemView) => `${element.orderDetail.id}`,
    },
  ];

  displayedColumns = this.columns.map((c: { columnDef: any }) => c.columnDef);

  constructor(
    private orderService: OrderService,
    private orderDetailsService: OrderDetailsService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.getCartItems();
    this.loadFormData();
  }

  loadFormData() {
    this.name = String(localStorage.getItem('name'));
    this.surname = String(localStorage.getItem('surname'));
    this.email = String(localStorage.getItem('email'));
  }

  
  validateNameAndSurname(): boolean {
    var letters = /^[A-Za-z]+$/;
    if (this.name.match(letters) && this.surname.match(letters)) {
      return true;
    } else {
      return false;
    }
  }
  
  validatePhoneNumber(): boolean {
    return Boolean(this.phoneNumber.toLowerCase().match(/^[0-9]\d*$/));
  }
  
  validatePostalCode(): boolean {
    return Boolean(this.postalCode.toLowerCase().match(/^[0-9]{2}-[0-9]{3}?$/));
  }
  
  validateEmail(): boolean {
    return Boolean(
      this.email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
        );
      }

      validateForm() {
    if (!this.validateNameAndSurname()) {
      this.isPayActionDisabled = true;
      return;
    }
    if (!this.validatePhoneNumber()) {
      this.isPayActionDisabled = true;
      return;
    }
    if (!this.validateEmail()) {
      this.isPayActionDisabled = true;
      return;
    }
    if (!this.validatePostalCode()) {
      this.isPayActionDisabled = true;
      return;
    }
    
    this.isPayActionDisabled = false;
  }
  
  onOrderSubmit() {
    let user = new User();
    user.id = Number(localStorage.getItem('user_id'));
    user.name = String(localStorage.getItem('name'));
    user.surname = String(localStorage.getItem('surname'));
    user.email = String(localStorage.getItem('email'));
    
    let order = new OrderWrapper();
    order.shipAddress = this.address;
    order.shipCity = this.city;
    order.shipPostalCode = this.postalCode;
    order.shipEmail = this.email;
    order.shipPhoneNo = this.phoneNumber;
    order.totalPrice = Number(this.totalCost);
    order.user = user;
    
    this.orderService.submitOrder(order).subscribe({
      next: (data) => {
        SnackBarNotificationUtil.showSnackBarSuccess(
          this.snackBar,
          'Przyjeliśmy twoje zamówienie :)',
          CLOSE_BUTTON
          )
          .afterDismissed()
          .subscribe({
            next: () => {
              this.router.navigateByUrl('/products');
            },
          });
        },
        error: (error: HttpErrorResponse) => {
          this.handleError(error, this.snackBar);
        },
        complete: () => {},
      });
    }
    
    getCartItems() {
      let userId = localStorage.getItem('user_id');
      this.orderService.getUserOrderDetails(String(userId)).subscribe({
        next: (data) => {
          this.orderDetails = data;
          this.totalCost = this.getTotalCost();
          this.dataSource = [];
          for (let index = 0; index < data.length; index++) {
            data[index].product.unitPrice = Number(data[index].product.unitPrice.toFixed(2));
            const wrapper: ShoppingCartItemView = {
              position: index + 1,
              orderDetail: data[index],
              productData: data[index].product,
            };
            this.dataSource.push(wrapper);
          }
          this.isLoaded = true;
        },
        error: (error: HttpErrorResponse) => {
          this.handleError(error, this.snackBar);
        },
        complete: () => {
          this.totalCost = this.getTotalCost();
        },
      });
    }
  
    deleteCartItem(shoppingCartItemView: ShoppingCartItemView) {
      this.orderDetailsService
        .deleteCartItem(shoppingCartItemView.orderDetail.id)
        .subscribe({
          next: (data) => {
            this.getCartItems();
          },
          error: (error: HttpErrorResponse) => {
            this.handleError(error, this.snackBar);
          },
          complete: () => {},
        });
    }

    getTotalCost(): string {
      return this.orderDetails
      .map((t) => t.totalPrice)
      .reduce((acc, value) => acc + value, 0).toFixed(2);
    }
  }
  