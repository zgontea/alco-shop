import { Component, Input, OnInit } from '@angular/core';
import { ImageService } from "../../services/image/image.service";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackBarNotificationUtil } from 'src/app/utils/snack-bar-notification-util';
import { Product } from 'src/app/wrappers/product';
import { ShoppingCartService } from '../../services/shopping-cart/shopping-cart.service';
import { ShoppingCart } from 'src/app/wrappers/shopping-cart';
import { UsersService } from 'src/app/services/users/users.service';
import { User } from 'src/app/wrappers/user';
import { JwtService } from "../../services/jwt/jwt.service";
import { MatDialog } from '@angular/material/dialog';
import { AddToCartComponent } from '../add-to-cart/add-to-cart/add-to-cart.component';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {

  @Input('product')
  product!: Product;
  imageFromBase64?: SafeUrl;
  cart!: Product[];

  constructor(private imageService: ImageService,
    private sanitizer: DomSanitizer,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private shoppingCartService: ShoppingCartService,
    private userService: UsersService) { }

  ngOnInit(): void {
    console.log(this.product.image);
    this.imageService.getImage(this.product.image)
      .subscribe(data => {
        this.imageFromBase64 = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + data.image);
      });
  }

  openDialog(product: Product) {
    this.dialog.open(AddToCartComponent, { data: product });
  }

}
