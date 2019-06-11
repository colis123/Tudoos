import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TodosService} from '../../services/todos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.page.html',
  styleUrls: ['./edit-todo.page.scss'],
})
export class EditTodoPage implements OnInit {

  @Input()todo:any;

  title: any;
  message: any;

  constructor( private modal: ModalController,
               private todoService: TodosService,
               private router: Router) { }

  goBack() {
    this.modal.dismiss();
  }

   // Add Todo 
   editTodo() {
    if(this.message == null || this.title == null ) {
      console.log('empty');
    } else {
      //Create todo 
      let todo = {
        title : this.title,
        message: this.message,
        date: this.todo.date,
        checked: this.todo.checked,
        todoId : this.todo.id
      }

      this.modal.dismiss().then (_ => {
        this.todoService.patchUserTodo(todo)
          .subscribe((res: any) => {});
        this.router.navigateByUrl('/home');
      })
     }
    
  }




  ngOnInit() {

  }

}
