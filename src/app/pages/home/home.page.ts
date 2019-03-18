import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AddTodoPage } from '../../modals/add-todo/add-todo.page';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  todoos: Observable<Array<object>>;
  todos; 



  constructor(private router: Router,
              private modal: ModalController,
              private toast: ToastController,
              private loader: LoadingController,
              private storage: Storage ) { 

                
    // this.storage.get('todos').then (res => {
    //   console.log(res);
    //   this.todoos = res;
    //   this.todos = res;
    // });
  }

  getTodos() {
    this.storage.get('todos').then (res => {
      console.log(res);
      this.todoos = res;
      this.todos = res;
    });
  }

  
  async deleteLoad() {
    const loading = await this.loader.create({
      spinner: 'bubbles',
      duration: 1000,
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
  }            

  // Delete Todo Toast
  async deleteToast() {
    const toast = await this.toast.create({
      message: 'Todo Deleted',
      position: 'top',
      duration: 1000
    });

    toast.present();
  }



  // Add todo method
  async addTodo() {
    const modal = await this.modal.create({
      component: AddTodoPage,
    });

    modal.onDidDismiss().then(_ => {
      this.ngOnInit();
    })

    return await modal.present();
  }

  // Delete todo method
  deleteTodo(todo: any) {
    let index = this.todos.indexOf(todo)
    if (index > -1) {
    this.todos.splice(index,1)
    }

    this.storage.set('todos', this.todos);
    this.deleteToast();
  }

  ngOnInit() {
    this.getTodos();
  }

}
