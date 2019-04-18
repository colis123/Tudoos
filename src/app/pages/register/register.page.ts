import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  newUser: any = {};

  constructor( private router: Router,
               private service: UserService) { }

  register() {
    this.service.registerUser(this.newUser)
      .subscribe((user:any) => {
        sessionStorage.setItem('token', user.token)
        sessionStorage.setItem('userId', user.userId)
    });
  }


  toLogin() {
    this.router.navigateByUrl('/login');
  }

  ngOnInit() {
  }

}
