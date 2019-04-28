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
    return this.http.post(`${this.userUrl}/login?include=user`, user);
  }

  logOutUser() {
    let token = window.sessionStorage.getItem('token');
    window.sessionStorage.clear();
    return this.http.post(`${this.userUrl}/logout?access_token=${token}`, {})
  }

  //http://localhost:3000/api/appUsers/logout?access_token=iXdbFlZlXYH5shcR1Zc8EYElvYIEnJPB5vJA3kXV7FcoSR16y04D7XkEmYMr0fw8

}
