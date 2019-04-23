import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { TodosService } from '../../services/todos.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: object = {};
  userData: any;
  loginValidation: boolean = false;

  constructor( private router: Router,
               private service: UserService,
               private todos: TodosService) { 
                 this.getTodos()
               }

  // Todos 
  getTodos() {
    this.todos.getTodo()
      .subscribe((res: any) => {
        console.log(res);
      })
  }

  toLogin() {
    this.service.loginUser(this.user)
      .subscribe((user: any) => {
        sessionStorage.setItem('token', user.token)
        sessionStorage.setItem('userId', user.userId)
        console.log(user);
        this.userData = user;

        this.router.navigateByUrl('/home');
        },
        (err:any) => {
          console.log(err);
        })
    
      // this.router.navigateByUrl('/home');
  }

  toRegister () {
    this.router.navigateByUrl('/register');
  }

  ngOnInit() {
  }

}
