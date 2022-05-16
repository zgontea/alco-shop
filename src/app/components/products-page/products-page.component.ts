import { Component, OnInit } from '@angular/core';
import { Product } from '../../wrappers/product';
import {JwtService} from "../../services/jwt/jwt.service";

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss']
})
export class ProductsPageComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {

  }

}
