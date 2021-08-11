import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { loginUserInterface, signupUserInterface } from './generalInterfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  authToken = '';
  constructor(private httpClient: HttpClient) {}
  userLogin(data : loginUserInterface) {
    return this.httpClient.get(environment.api_url + 'users/getUserByData', {
      params: data as any
    }).toPromise();
  }
  userSignUp(data: signupUserInterface) {
    return this.httpClient.post(environment.api_url + 'users/insertUser', data).toPromise();
  }
}
