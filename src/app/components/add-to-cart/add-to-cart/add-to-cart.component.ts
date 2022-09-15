import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CLOSE_BUTTON } from 'src/app/globals';
import { OrderDetailsService } from 'src/app/services/order-details/order-details.service';
import { HttpErrorHandler } from 'src/app/utils/http-error-handler';
import { SnackBarNotificationUtil } from 'src/app/utils/snack-bar-notification-util';
import { OrderDetails } from 'src/app/wrappers/order-details';
import { Product } from 'src/app/wrappers/product';
import { ShoppingCartItem } from 'src/app/wrappers/shopping-cart-item';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss'],
})
export class AddToCartComponent extends HttpErrorHandler implements OnInit {
  product!: Product;
  quantity: number = 1;
  orderDetails = new OrderDetails();
  shoppingCartItem = new ShoppingCartItem();

  constructor(
    public dialogRef: MatDialogRef<AddToCartComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product,
    private orderDetailsService: OrderDetailsService,
    private snackBar: MatSnackBar
  ) {
    super();
  }

  ngOnInit(): void {
    this.product = this.data;
  }

  get totalPrice(): number {
    if (!this.quantity) {
      return 0;
    }
    return this.quantity * this.product.unitPrice;
  }

  public addProduct(): void {
    if (this.totalPrice <= 0) {
      SnackBarNotificationUtil.showSnackBarFailure(
        this.snackBar,
        'Wystąpił nieoczekiwany błąd',
        CLOSE_BUTTON
      );
    }
    this.orderDetails.totalPrice = this.totalPrice;
    this.orderDetails.quantity = this.quantity;
    this.orderDetails.product = this.product;
    this.shoppingCartItem.orderDetail = this.orderDetails;
    this.shoppingCartItem.userId = Number(localStorage.getItem('user_id'));
    this.orderDetailsService.addOrder(this.shoppingCartItem).subscribe({
      next: (data) => {
        SnackBarNotificationUtil.showSnackBarSuccess(
          this.snackBar,
          'Produkt został dodany do koszyka',
          CLOSE_BUTTON
        );
      },
      error: (error: HttpErrorResponse) => {
        this.handleError(error, this.snackBar);
      },
      complete: () => {
        this.dialogRef.close();
      },
    });
  }
}
