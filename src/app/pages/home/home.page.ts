import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AddTodoPage } from '../../modals/add-todo/add-todo.page';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  todos; 
  todosLength;



  constructor(private router: Router,
              private modal: ModalController,
              private toast: ToastController,
              private loader: LoadingController,
              private todoService: TodosService ) { 

  }

  todosList() {
    this.todoService.getUserTodos()
      .subscribe((res:any) => {
        console.log(res);
        this.todosLength = res.length;
        this.todos = res;

      })
  }


  // Delete Loader
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

  //Loader For Todo Addition
  async addTodoLoader() {
    const loading = await this.loader.create({
      spinner: 'bubbles',
      duration: 500,
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
  }       

  // Add todo Modal
  async addTodo() {
    const modal = await this.modal.create({
      component: AddTodoPage,
    });

    modal.onDidDismiss().then(_ => {
      this.addTodoLoader().then
      setTimeout(() => {
        this.todosList();
      }, 550);
    });

    return await modal.present();
  }

  // Delete todo method
  deleteTodo(todoId) {
    this.todoService.deleteUserTodo(todoId)
      .subscribe((res: any) => {
        console.log('deleted')
      });
  }


  ngOnInit() {
  }

  ionViewWillEnter() {
    this.todosList();
    console.log('Load will Enter');
  }

  ionViewWillLeave() {
    this.todosList();
  }


}
