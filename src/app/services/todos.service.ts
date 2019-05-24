import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class TodosService {

  userUrl: string = 'https://fast-plateau-19135.herokuapp.com/api/appUsers/';

  // userInfo: object = {
  //   userToken : window.sessionStorage.getItem('token'),
  //   userId: window.sessionStorage.getItem('userId')
  // }


  constructor( private storage: Storage,
               private http: HttpClient) { 
    
               }
  
  // API Call Using
  getUserTodos() {
    let token = window.sessionStorage.getItem('token');
    let userId = window.sessionStorage.getItem('userId');
    return this.http.get(`${this.userUrl}/${userId}/todos?access_token=${token}`)
  }

  // Delete Todo Using Todo Id
  deleteUserTodo(todoId) {
    let token = window.sessionStorage.getItem('token');
    let userId = window.sessionStorage.getItem('userId');
    return this.http.delete(`${this.userUrl}/${userId}/todos/${todoId}?access_token=${token}`);
  }

  // Post Todo
  postUserTodo(todo) {
    let token = window.sessionStorage.getItem('token');
    let userId = window.sessionStorage.getItem('userId');
    return this.http.post(`${this.userUrl}/${userId}/todos?access_token=${token}`, todo)
  }

  updateUserTodo(todo) {
    let token = window.sessionStorage.getItem('token');
    let userId = window.sessionStorage.getItem('userId');
    return this.http.put(`${this.userUrl}/${userId}/todos/${todo.id}?access_token=${token}`, todo)
  }
  
  //http://localhost:3000/api/appUsers/5cbfbd4400d968760a7b4da9/todos/5cc3d78fb5772184a1388473?access_token=iXdbFlZlXYH5shcR1Zc8EYElvYIEnJPB5vJA3kXV7FcoSR16y04D7XkEmYMr0fw8




}
