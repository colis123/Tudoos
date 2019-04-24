import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AddTodoPage } from '../../modals/add-todo/add-todo.page';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';
import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  todoos: Observable<Array<object>>;
  todos; 
  todosLength;
  userInfo: any;



  constructor(private router: Router,
              private modal: ModalController,
              private toast: ToastController,
              private loader: LoadingController,
              private storage: Storage,
              private todoService: TodosService ) { 

  }

  todosList() {
    this.todoService.getUserTodos()
      .subscribe((res:any) => {
        console.log(res.length);

      })
  }

  getTodos() {
    this.storage.get('todos').then (res => {
      if(res != null) {
        console.log('from storage', res);
        this.todoos = res;
        this.todos = res;
        this.todosLength = res.length;
        console.log('length of todos from storage', this.todosLength)
      }
      else {
      }
    });
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



  // Add todo Modal
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

    this.storage.set('todos', this.todos).then(_ => {
      this.deleteToast();
      this.ngOnInit();
    });
  }

  //Initialize an empty array 
  setTodos() {
    this.storage.set('todos', [])
  }


  ngOnInit() {
    //Get Todos from API
    this.todosList();
  
    


    if(this.storage.get('todos') == null ) {
      this.setTodos();
    }
    
    this.getTodos();
  }

}
