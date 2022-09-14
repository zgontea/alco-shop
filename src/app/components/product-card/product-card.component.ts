import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Product } from 'src/app/wrappers/product';
import { ImageService } from '../../services/image/image.service';
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

  constructor(
    private imageService: ImageService,
    private sanitizer: DomSanitizer,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.imageService.getImage(this.product.image).subscribe((data) => {
      this.imageFromBase64 = this.sanitizer.bypassSecurityTrustResourceUrl(
        'data:image/jpg;base64,' + data.image
      );
    });
  }

  openDialog(product: Product) {
    this.dialog.open(AddToCartComponent, { data: product });
  }
}
