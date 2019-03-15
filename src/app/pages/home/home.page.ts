import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

}
