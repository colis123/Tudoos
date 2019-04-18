import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: object = {};
  userData: any;

  constructor( private router: Router,
               private service: UserService) { }

  toLogin() {
    this.service.loginUser(this.user)
      .subscribe((user: any) => {
        sessionStorage.setItem('token', user.token)
        sessionStorage.setItem('userId', user.userId)
        console.log(user);
        this.userData = user;
      })

      this.router.navigateByUrl('/home');
  }

  toRegister () {
    this.router.navigateByUrl('/register');
  }

  ngOnInit() {
  }

}
