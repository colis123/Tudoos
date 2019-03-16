import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AddTodoPage } from '../../modals/add-todo/add-todo.page';

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
              private modal: ModalController) { }

  async addTodo() {
    const modal = await this.modal.create({
      component: AddTodoPage,
    });
    

    return await modal.present();
  }

  ngOnInit() {
  }

}
