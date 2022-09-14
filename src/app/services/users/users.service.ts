import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/wrappers/user';
import { UrlProviderService } from '../urlProvider/url-provider.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<User[]>
  {
    let header = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    console.log(`Bearer ${localStorage.getItem('access_token')}`);

    return this.httpClient.get<User[]>(
      UrlProviderService.users + '/all', { headers: header }
    )
  }

  delete(user: User){
    let header = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    return this.httpClient.delete(
      UrlProviderService.users + '/del/' + user.id, { headers: header });
  }

  getByEmail(email: string): Observable<User> {
    let header = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);

    return this.httpClient.get<User>(
      UrlProviderService.users + '/email/' + email, { headers: header });
  }
  
  update(user: User) {
    let header = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);

    return this.httpClient.put<User>(
      UrlProviderService.users + '/upd/', { headers: header });
  }
}
