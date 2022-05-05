import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../wrappers/user';

import { UrlProviderService } from '../urlProvider/url-provider.service';


@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private httpClient: HttpClient) { }

  registerUser(user: User): Observable<Object> {
    console.log(user);
    return this.httpClient.post(UrlProviderService.register + '/save', user);
  }
}
