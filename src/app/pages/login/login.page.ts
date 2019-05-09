import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: object = {};
  loginValidation: boolean = false;

  constructor( private router: Router,
               private service: UserService,
               private toast: ToastController,
               private storage: Storage) { 
               }

  async loginAlert() {
  const toast = await this.toast.create({
    message: 'Incorrect Email/ Password',
    duration: 2000,
    position: 'middle',
    cssClass: 'toast'
  });
  toast.present();
  }

  
  toLogin() {
    this.service.loginUser(this.user)
      .subscribe((user: any) => {
        sessionStorage.setItem('token', user.token)
        sessionStorage.setItem('userId', user.userId)
        console.log(user.user.firstName);
        //Store user object 
        sessionStorage.setItem('firstName', user.user.firstName);
        // Clear input field
        this.user = {};
        this.router.navigateByUrl('/home');
        },
        (err:any) => {
          if(err.status === 401){
            this.loginAlert()
          }
          
        });
  }

  toRegister () {
    this.router.navigateByUrl('/register');
  }

  ngOnInit() {
  }

}
