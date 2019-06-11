import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class TodosService {

  userUrl: string = 'https://fast-plateau-19135.herokuapp.com/api/appUsers';
  todosUrl: string = 'https://fast-plateau-19135.herokuapp.com/api/todos'

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

  patchUserTodo(todo) {
    let token = window.sessionStorage.getItem('token');
    let userId = window.sessionStorage.getItem('userId');
    return this.http.patch(`${this.todosUrl}/${todo.todoId}?access_token=${token}`, todo)

  }
  
  // http://localhost:3000/api/todos/5cfedf9795539b00174e68c5?access_token=vlp92vww2mFoyLZd0E6KR8ZBkL3BJUDKgZnLq1wcDCSyTwX2sGkJZWS3SRH8s1Pz





}
