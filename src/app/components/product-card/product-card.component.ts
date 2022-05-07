import { Component, Input, OnInit } from '@angular/core';
import {ImageService} from "../../services/image/image.service";

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  constructor(private imageService: ImageService)
  {}

  @Input('name')
  public name = 'Name';

  @Input('category')
  public category = 'Category';

  @Input('image')
  public image = '../../assets/product-images/absolut-vodka.jpg';

  @Input('des')
  public description = 'Pyszka trzeba pić';

  @Input('price')
  public unitPrice = 45.99;

  @Input('size')
  public size = 700;


  @Input('concentration')
  public concentration = 40;

  public get pathToImages() {
    return this.imageService.getImage(this.image)
  }



  ngOnInit(): void {}
}
