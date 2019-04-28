import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { TodosService} from '../../services/todos.service';



@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.page.html',
  styleUrls: ['./add-todo.page.scss'],
})
export class AddTodoPage implements OnInit {

  date: string;
  title: string;
  message: string;
  inputsMissing: boolean = false;

  constructor(private router: Router,
              private modal: ModalController,
              private todoService: TodosService) {
  }

  // Cancel and go back to home page.
  goBack() {
    this.modal.dismiss();
  }

  // Add Todo 
  addTodo() {
    if(this.date == null || this.message == null || this.title == null ) {
      console.log('empty');
    } else {
      //Create todo 
      let todo = {
        title : this.title,
        message: this.message,
        date: this.date,
        checked: false
      }

      this.modal.dismiss().then (_ => {
        this.todoService.postUserTodo(todo)
          .subscribe((res: any) => {});
        this.router.navigateByUrl('/home');
      })
     }
    
  }

  ngOnInit() {

  }

}
