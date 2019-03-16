import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.page.html',
  styleUrls: ['./add-todo.page.scss'],
})
export class AddTodoPage implements OnInit {

  constructor(private router: Router,
              private modal: ModalController) { }

  // Cancel and go back to home page.
  goBack() {
    this.modal.dismiss();
  }

  ngOnInit() {
  }

}
