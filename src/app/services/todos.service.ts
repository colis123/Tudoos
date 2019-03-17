import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';



@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor( private storage: Storage) { }

  saveTodo(todo) {
    this.storage.set('todos', todo)
  }

}
