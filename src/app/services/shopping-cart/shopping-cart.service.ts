import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ShoppingCart } from '../../wrappers/shopping-cart';
import { Observable } from 'rxjs';
import { UrlProviderService } from '../urlProvider/url-provider.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private httpClient: HttpClient) { }

  public addShoppingCart(shoppingCart: ShoppingCart): Observable<ShoppingCart> {
    let header = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    console.log(`Bearer ${localStorage.getItem('access_token')}`);

    return this.httpClient.post<ShoppingCart>(
      UrlProviderService.shoppingCart + '/save', {headers: header}
    );
  }

  public getShoppingCarts(): Observable<ShoppingCart[]> {
    let header = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    console.log(`Bearer ${localStorage.getItem('access_token')}`);

    return this.httpClient.get<ShoppingCart[]>(
      UrlProviderService.shoppingCart + '/all', { headers: header }
    );
  }

  delShoppingCart(shoppingCart: ShoppingCart){
    let header = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    return this.httpClient.delete(
      UrlProviderService.shoppingCart + '/del/' + shoppingCart.id, { headers: header });
  }
}
