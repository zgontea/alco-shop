import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../../wrappers/category';
import { ProductAdd } from '../../../wrappers/product-add';
import { ProductsService } from '../../../services/products/products.service';
import { CategoryService } from '../../../services/category/category.service';
import { MatRadioChange } from '@angular/material/radio';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarNotificationUtil } from 'src/app/utils/snack-bar-notification-util';

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

  constructor(
    private productsService: ProductsService,
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
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

  addProduct() {
    this.newProduct.image = this.form.value.image;
    this.newProduct.categoryName = this.value;
    //this.newProduct = this.form.value as ProductAdd;
    // this.newProduct.categoryName = this.catName
    this.productsService.add(this.newProduct).subscribe({
      next: (_) => {
        SnackBarNotificationUtil.showSnackBarSuccess(
          this._snackBar,
          'Produkt został dodany pomyślnie',
          'Zamknij'
        );
        this.form.reset();
        if (this.imageInput) {
          this.imageInput.nativeElement.value = '';
        }
        window.location.reload();
      },
      error: (error) => {
        SnackBarNotificationUtil.showSnackBarSuccess(
          this._snackBar,
          'Podczas usuwania wystapił problem',
          'Zamknij'
        );
      },
      complete: () => {},
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

  showSnackBarError(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3500,
      panelClass: ['snack-failure'],
      verticalPosition: 'top',
    });
  }

  showSnackBarSuccess(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3500,
      panelClass: ['snack-success'],
      verticalPosition: 'top',
    });
  }
}
