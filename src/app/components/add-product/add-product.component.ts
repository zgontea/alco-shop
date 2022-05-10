import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Category} from "../../wrappers/category";
import {ProductAdd} from "../../wrappers/product-add";
import {ProductsService} from "../../services/products/products.service";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  @ViewChild('imageInput')
  imageInput?: ElementRef;

  form: FormGroup;
  categories?: Category[];

  newProduct: ProductAdd = {
    name: '',
    unitPrice: 0,
    categoryId: 1,
    image: '',
    description: '',
    size: 0,
    concentration: 0
  }

  constructor(private productsService: ProductsService,
              private fb: FormBuilder) {
    this.form = fb.group({
      'name': ['', Validators.required],
      'unitPrice': ['', [Validators.required, Validators.min(0)]],
      'categoryId': ['', Validators.required],
      'image': ['', Validators.required],
      'description':['', Validators.required],
      'size':['', Validators.required, Validators.min(0)],
      'concentration':['', Validators.required, Validators.min(0)],
    });
  }
  ngOnInit(): void {
  }

  addProduct() {
    this.newProduct = this.form.value as ProductAdd;

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
