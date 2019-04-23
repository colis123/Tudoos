import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class TodosService {

  todoUrl: string = 'http://localhost:3000/api/todos';

  constructor( private storage: Storage,
               private http: HttpClient) { 
                 this.getTodo();
               }

  getTodo() {
    return this.http.get(`${this.todoUrl}`);
  }

  saveTodo(todo) {
    this.storage.set('todos', JSON.stringify(todo))
  }

}
