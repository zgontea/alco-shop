import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderDetailsService } from 'src/app/services/order-details/order-details.service';
import { OrderService } from 'src/app/services/order/order.service';
import { SnackBarNotificationUtil } from 'src/app/utils/snack-bar-notification-util';
import { Order } from 'src/app/wrappers/order';
import { OrderDetails } from 'src/app/wrappers/order-details';
import { Product } from 'src/app/wrappers/product';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss']
})
export class AddToCartComponent implements OnInit {
  product!: Product;
  quantity: number = 1;
  orderDetails: OrderDetails = new OrderDetails()
  order: Order = new Order()

  constructor(public dialogRef: MatDialogRef<AddToCartComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product,
    private orderDetailsService: OrderDetailsService,
    private orderService: OrderService,
    private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.product = this.data;
  }

  public multiply(): Number | undefined {
    if (!this.quantity) {
      return undefined;
    } 
    return this.quantity * this.product.unitPrice;
  }

  public addProduct(): void {
    console.log(this.data.name);
    this.order.shipCity = "dupa"
    // this.order.date = new Date();
    this.order.shipCountry = "dupa";
    this.order.shipEmail = "dupa";
    this.order.shipPhoneNumber = "dupa";
    this.order.shipTo = "dupa";
    this.order.shipPostalCode = "dupa";
    this.order.userId = 2;
    this.orderService.addOrder(this.order).subscribe({
      next: (_) => {
        SnackBarNotificationUtil.showSnackBarSuccess(
          this._snackBar,
          'Produkt został dodany pomyślnie',
          'Zamknij'
        );
      },
      error: (error) => {
        SnackBarNotificationUtil.showSnackBarSuccess(
          this._snackBar,
          'Podczas usuwania wystapił problem',
          'Zamknij'
        );
      },
      complete: () => { },
    });

    // this.orderDetails.price = this.quantity * this.product.unitPrice;
    // this.orderDetails.quantity = this.quantity;
    // this.orderDetails.productId = this.product.id;
    // this.orderDetails.orderId = this.order.id;
    // this.orderDetailsService.addOrder(this.orderDetails).subscribe({
    //   next: (_) => {
    //     SnackBarNotificationUtil.showSnackBarSuccess(
    //       this._snackBar,
    //       'Produkt został dodany pomyślnie',
    //       'Zamknij'
    //     );
    //   },
    //   error: (error) => {
    //     SnackBarNotificationUtil.showSnackBarSuccess(
    //       this._snackBar,
    //       'Podczas usuwania wystapił problem',
    //       'Zamknij'
    //     );
    //   },
    //   complete: () => { },
    // });
    return
  }

}
