import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  userUrl: string = 'http://localhost:3000/api/appUsers'

  constructor( private http: HttpClient) { }

  registerUser(user: any) {
    return this.http.post(`${this.userUrl}`, user);
  }

  loginUser(user: any) {
    return this.http.post(`${this.userUrl}/login`, user);
  }
}
