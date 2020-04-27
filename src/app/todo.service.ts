import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  //user data from sign up
  postUserData(user) {
    return this.http.post("http://localhost:3000/users", user);
  }
  getUserData() {
    return this.http.get("http://localhost:3000/users");
  }

  // active user to make authentication 
  postUserActive(user) {
    return this.http.post("http://localhost:3000/activeUser", user);
  }
  getUserActive() {
    return this.http.get("http://localhost:3000/activeUser");
  }

  deleteUserActive(id) {
    return this.http.delete('http://localhost:3000/activeUser/' + id)
  }

  // user task 
  postUsertask(task) {
    return this.http.post("http://localhost:3000/tasks", task);
  }

  getUsertask() {
    return this.http.get("http://localhost:3000/tasks/");
  }
  postTaskAfterEdit(task) {
    return this.http.post("http://localhost:3000/tasks", task);
  }

  deleteUserTask(id) {
    return this.http.delete('http://localhost:3000/tasks/' + id);
  }

}
