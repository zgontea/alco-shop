import { Component, Input, OnInit } from '@angular/core';
import {ImageService} from "../../services/image/image.service";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  constructor(private imageService: ImageService,
              private sanitizer: DomSanitizer)
  {}

  @Input('name')
  public name = 'Name';

  @Input('category')
  public category = 'Category';

  @Input('image')
  public image = 'absolut-lime.jpg';
  imageFromBase64?: SafeUrl;
  @Input('des')
  public description = 'Pyszka trzeba pić';

  @Input('price')
  public unitPrice = 45.99;

  @Input('size')
  public size = 700;


  @Input('concentration')
  public concentration = 40;


  ngOnInit(): void {
    console.log(this.image);
    this.imageService.getImage(this.image)
      .subscribe(data => {
        this.imageFromBase64 = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + data.image);
      });
  }
}
