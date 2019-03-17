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


  constructor(private router: Router,
              private modal: ModalController,
              private service: TodosService) { }

  // Cancel and go back to home page.
  goBack() {
    this.modal.dismiss();
  }

  // Add Todo 
  addTodo() {
  }

  ngOnInit() {

  }

}
