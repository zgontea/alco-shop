import { Component, Input, OnInit } from '@angular/core';
import {ImageService} from "../../services/image/image.service";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {MatSnackBar} from "@angular/material/snack-bar";
import { SnackBarNotificationUtil } from 'src/app/utils/snack-bar-notification-util';
import { Product } from 'src/app/wrappers/product';
import { ShoppingCart } from 'src/app/utils/shopping-cart';
@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {

  @Input('product')
  product!: Product;
  imageFromBase64?: SafeUrl;

  constructor(private imageService: ImageService,
    private sanitizer: DomSanitizer,
    private _snackBar: MatSnackBar)
{}

  ngOnInit(): void {
    console.log(this.product.image);
    this.imageService.getImage(this.product.image)
      .subscribe(data => {
        this.imageFromBase64 = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + data.image);
      });
  }

  addToShoppingCart()
  {
    SnackBarNotificationUtil.showSnackBarSuccess(
      this._snackBar,
      'Produkt został dodany pomyślnie',
      'Zamknij'
    );
    ShoppingCart.products.push(this.product);
    console.log(ShoppingCart.products);
    
  }

}
