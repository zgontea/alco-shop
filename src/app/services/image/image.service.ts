import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Image } from '../../wrappers/image';
import { Observable } from 'rxjs';
import { Product } from '../../wrappers/product';

import { UrlProviderService } from '../urlProvider/url-provider.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private httpClient: HttpClient) { }

  getImage(imageName: string): Observable<Image> {
    console.log(UrlProviderService.image + "/" + imageName);
    return this.httpClient.get<Image>(
      UrlProviderService.image + "/" + imageName);
  }
}
