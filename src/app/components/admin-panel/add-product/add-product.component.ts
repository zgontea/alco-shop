import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../../wrappers/category';
import { ProductAdd } from '../../../wrappers/product-add';
import { ProductsService } from '../../../services/products/products.service';
import { CategoryService } from '../../../services/category/category.service';
import { MatRadioChange } from '@angular/material/radio';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarNotificationUtil } from 'src/app/utils/snack-bar-notification-util';
import { CLOSE_BUTTON } from 'src/app/globals';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  @ViewChild('imageInput')
  imageInput?: ElementRef;

  public form: FormGroup;
  public categories: Category[] = [];
  public value = '';

  newProduct: ProductAdd = new ProductAdd();
  isEdit = false;

  constructor(
    private productsService: ProductsService,
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AddProductComponent>,
  ) {
    this.getCategories();
    this.form = fb.group({
      image: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.getCategories();
  }

  public getCategories(): void {
    this.categoryService
      .getCategories()
      .subscribe((value) => (this.categories = value));
  }

  onChange(event: MatRadioChange) {
    this.value = event.source.value;
    console.log(event.source.value);
  }

  updateProduct() {
    this.productsService.update(this.newProduct).subscribe({
      next: (_) => {
        SnackBarNotificationUtil.showSnackBarSuccess(
          this._snackBar,
          'Produkt został zapisany pomyślnie',
          'Zamknij'
        );
        this.form.reset();
        if (this.imageInput) {
          this.imageInput.nativeElement.value = '';
        }
      },
      error: (error) => {
        SnackBarNotificationUtil.showSnackBarFailure(
          this._snackBar,
          'Podczas zapisywania wystapił problem',
          'Zamknij'
        );
      },
      complete: () => {
        this.dialogRef.close();
      },
    });
  }

  addProduct() {
    if (this.isEdit) {
      return this.updateProduct();
    }
    this.newProduct.image = this.form.value.image;
    this.newProduct.categoryName = this.value;
    this.productsService.add(this.newProduct).subscribe({
      next: (_) => {
        SnackBarNotificationUtil.showSnackBarSuccess(
          this._snackBar,
          'Produkt został dodany pomyślnie',
          CLOSE_BUTTON
        );
        this.form.reset();
        if (this.imageInput) {
          this.imageInput.nativeElement.value = '';
        }
      },
      error: (error) => {
        SnackBarNotificationUtil.showSnackBarFailure(
          this._snackBar,
          'Podczas dodawania wystapił problem',
          CLOSE_BUTTON
        );
      },
      complete: () => {
        this.dialogRef.close();
      },
    });
  }

  fileChanged(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
      return;
    }
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const image = new Image();
      image.src = e.target.result;
      image.onload = (rs) => {
        this.form.patchValue({
          image: e.target.result,
        });
      };
    };
    reader.readAsDataURL(file);
  }
}
