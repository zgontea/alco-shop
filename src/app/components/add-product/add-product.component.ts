import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../wrappers/category';
import { ProductAdd } from '../../wrappers/product-add';
import { ProductsService } from '../../services/products/products.service';
import { CategoryService } from '../../services/category/category.service';
import { MatRadioChange } from '@angular/material/radio';

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
  public catName = 'Wódki';
  public value = '';

  newProduct: ProductAdd = new ProductAdd();

  constructor(
    private productsService: ProductsService,
    private categoryService: CategoryService,
    private fb: FormBuilder
  ) {
    this.getCategories();
     this.form = fb.group({
    //   'name': ['', Validators.required],
    //   'unitPrice': ['', [Validators.required, Validators.min(0)]],
    //   //'categoryName': ['', Validators.required],
       'image': ['', Validators.required],
    //   'description':['', Validators.required],
    //   'size':['', Validators.required, Validators.min(0)],
    //   'concentration':['', Validators.required, Validators.min(0)],

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
    this.catName = event.source.value;
  }

  addProduct() {
    this.newProduct.image = this.form.value.image;
    this.newProduct.categoryName = this.catName;
    //this.newProduct = this.form.value as ProductAdd;
    // this.newProduct.categoryName = this.catName
    this.productsService.addProducts(this.newProduct).subscribe({
      next: _ => {
        this.form.reset();
        if (this.imageInput) {
          this.imageInput.nativeElement.value = '';
        }
      }
    })
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
        image.onload = rs => {
          this.form.patchValue({
            image: e.target.result
          });
        }
      }
      reader.readAsDataURL(file)
    }

}
