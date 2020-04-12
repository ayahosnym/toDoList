import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
// import{NgForm}
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  formToAddTasks: FormGroup
  formEditTask: FormGroup
  currentUserName;
  currentUserEmail: any;
  userTasks;
  userTaskValue;

  constructor(private fb: FormBuilder, private service: TodoService) {
    this.currentUserName = JSON.parse(localStorage.getItem('currentUser')).userName
    this.currentUserEmail = JSON.parse(localStorage.getItem('currentUser')).email

  }


  ngOnInit() {
    //form to add task
    this.formToAddTasks = this.fb.group({
      userTask: ['', Validators.required],
    });

    this.formEditTask = this.fb.group({
      editTask: ['', Validators.required],
    });

    //  get the tasks form service to showe them in his home page

    this.service.getUsertask().subscribe(data => {
      this.userTasks = data;
      console.log(this.userTasks);


    })
  }
  // add task when  user click input and save this task in the json file (data base)
  onSubmit(task) {
    task.value.userName = this.currentUserName;
    task.value.userEmail = this.currentUserEmail
    this.service.postUsertask(task.value).subscribe(data => {
      task.value = data;
      task.reset()
    })
    this.userTaskValue = task.value.userTask
    console.log(this.userTaskValue)
  }
  //Start form to edit  task(on progress)
  onSubmitEdit(input) {
    //   task.value.userName = this.currentUserName;
    //   task.value.userEmail = this.currentUserEmail
    //  task.value=1
    console.log(input.value.editTask)
    input.value.editTask = 111
  }


  // edit user task
  editTask(e) {
    let input = e.target

  }


  saveTaskAfterEdit($event){

  }
  // End form to edit task




  // make check when the task done (change color to green)
  taskDone(e) {
    let task = e.target
    if (task.style.background == 'transparent') {
      task.style.background = '#46A049'
    }
    else {

      task.style.background = 'transparent'
    }

  }

  //delete task
  deleteTask(e) {
    let task = e.target.parentNode

    let sureDeleteTask = confirm('Are you sure you want delete this?')
    if (sureDeleteTask) {
      this.service.deleteUserTask(task.id).subscribe(data => {
        task.id = data
      })
      task.remove();

    }
  }
  // this function to stop add task when input  is empty
  inputClick(e) {
    let input = e.target

    if (!input.value) {
      input.disabled = false;

    }
  }


}

