import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { TodosService} from '../../services/todos.service';
import { Storage } from '@ionic/storage';
import { HomePage } from '../../pages/home/home.page';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.page.html',
  styleUrls: ['./add-todo.page.scss'],
})
export class AddTodoPage implements OnInit {

  date: string;
  title: string;
  message: string;
  todoos:  Array<object>;
 




  constructor(private router: Router,
              private modal: ModalController,
              private service: TodosService,
                private storage: Storage) {

    // Get todos
    this.storage.get('todos').then (res => {
      if(res != null) {
        this.todoos = res;
      }
      else {
        this.todoos = [{
          title: 'Add a Todoo'
        }]
      }
    })
  }

  // Cancel and go back to home page.
  goBack() {
    this.modal.dismiss();
  }

  // Add Todo 
  addTodo() {
    //Create todo 
    let todo = {
      title : this.title,
      message: this.message,
      date: this.date,
      checked: false
    }

    // Push to todoos array
    this.todoos.unshift(todo);
    //Set to Storage
    this.storage.set('todos', this.todoos);

    this.modal.dismiss().then (_ => {
      this.router.navigateByUrl('/home');
    })
    
  }

  ngOnInit() {

  }

}
