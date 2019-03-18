import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { TodosService} from '../../services/todos.service';
import { Storage } from '@ionic/storage';
import { HomePage } from '../../pages/home/home.page';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.page.html',
  styleUrls: ['./add-todo.page.scss'],
})
export class AddTodoPage implements OnInit {

  date: string;
  title: string;
  message: string;
  todoos: Observable<Array<object>>;




  constructor(private router: Router,
              private modal: ModalController,
              private service: TodosService,
                private storage: Storage) {
    this.storage.get('todos').then (res => {
      this.todoos = res;
    })
  }

  // Cancel and go back to home page.
  goBack() {
    this.modal.dismiss();
  }

  // Add Todo 
  addTodo() {
    let todo = {
      title : this.title,
      message: this.message,
      date: this.date,
      checked: false
    }

    this.todoos.unshift(todo);
    this.storage.set('todos', this.todoos);

    this.modal.dismiss();
    console.log(this.todoos)
  }

  ngOnInit() {

  }

}
