import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AddTodoPage } from '../../modals/add-todo/add-todo.page';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {


  todos: any = [
    {
    title: 'First Todo',
    message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    date: "3/14/2019",
    checked: true,
    },
    {
      title: 'Second Todo',
    message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    date: "3/15/2019",
    checked: false,
    }
  ]

  constructor(private router: Router,
              private modal: ModalController,
              private toast: ToastController,
              private loader: LoadingController ) { }

  
  
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
    return await modal.present();
  }

  // Delete todo method
  deleteTodo(todo: any) {
    let index = this.todos.indexOf(todo)
    if (index > -1) {
    this.todos.splice(index,1)
    }
    this.deleteToast();
  }

  ngOnInit() {
  }

}
