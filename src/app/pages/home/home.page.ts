import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AddTodoPage } from '../../modals/add-todo/add-todo.page';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { TodosService } from '../../services/todos.service';
import { UserService } from '../../services/user.service';
import { ActionSheetController } from '@ionic/angular';
import { EditTodoPage } from 'src/app/modals/edit-todo/edit-todo.page';



@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  todos; 
  todosLength;
  detailBoolean: boolean = false;



  constructor(private router: Router,
              private modal: ModalController,
              private toast: ToastController,
              private loader: LoadingController,
              private todoService: TodosService,
              private userService: UserService,
              private actionSheet: ActionSheetController ) { 

  }

  // Get user todos.
  todosList() {
    this.todoService.getUserTodos()
      .subscribe((res:any) => {
        this.todosLength = res.length;
        this.todos = res;

      })
  }

  // These are Delete methods, including Loaders/ Toasts.////

  // Delete todo method
  deleteTodo(todoId) {

    this.deleteLoad().then(_ => {

      this.todoService.deleteUserTodo(todoId)
        .subscribe((res: any) => {
          
        });
    })
    .then(_ => {
      setTimeout(() => {
        this.todosList();
        this.deleteToast();
      }, 500);
    })
  }

  // Delete Loader
  async deleteLoad() {
    const loading = await this.loader.create({
      spinner: 'bubbles',
      duration: 500,
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
      duration: 1300,
      cssClass: 'deleteTodo'
    });

    toast.present();
  }
  ////////////////////

  // Add Todo methods including loader/modals //

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

  // Edit Todos
  async editTodoModal(todo) {
    const modal = await this.modal.create({
      component: EditTodoPage,
      componentProps: {todo}
    });

    modal.onDidDismiss().then(_ => {
      this.addTodoLoader().then
        setTimeout(() => {
        this.todosList();
        }, 550)
    })
    return await modal.present();
  }


  updateTodo(todo) {

    setTimeout(_ => {
      this.todoService.updateUserTodo(todo)
      .subscribe((res: any) => {
      })
    },100)
    setTimeout(_ => {
      this.ionViewWillLeave();
    }, 200)
  }
  //////////////////////

  // Log out User //

  async presentActionSheet() {
    const actionSheet = await this.actionSheet.create({
      animated: true,
      header: 'Want to log out?',
      buttons: [{
        text: 'Log Out',
        role: 'destructive',
        handler: () => {
          this.logOut();
        }
      }, 
      {
        text: 'Cancel',
        role: 'cancel',
      }]
    });
    await actionSheet.present();
  }
  

  logOut() {
    this.userService.logOutUser();
    this.router.navigateByUrl('/login');
  }


  ngOnInit() {
  }

  ionViewWillEnter() {
    this.todosList();
  }

  ionViewWillLeave	() {
    this.todosList();
  }


}
