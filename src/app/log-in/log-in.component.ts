import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../todo.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  loginForm: FormGroup;
  usersInfo;
  userEmail;
  userPassword;

  idUserActive
  nameUserActive;

  constructor(
    private activeRoute: ActivatedRoute,
    private service: TodoService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    //validation form 
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.pattern('^[a-zA-Z0-9._-]+@gmail|yahoo.[a-zA-Z]{2,}$')]],
      password: ["", [Validators.required, Validators.minLength(5), Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[a-zA-Z0-9].{5,}$')]],
    });

    //get  users info from json to see if the user who log in is exist  or not 
    this.service.getUserData().subscribe(data => {
      return this.usersInfo = data;
    })

  }
  onSubmit(loginForm) {
    this.userEmail = loginForm.get('email').value;
    this.userPassword = loginForm.get('password').value;


    if (loginForm.valid) {
      for (let i = 0; i < this.usersInfo.length; i++) {
        if (this.userEmail == this.usersInfo[i].email && this.userPassword == this.usersInfo[i].password) {
          let userObj = this.usersInfo[i];
          localStorage.setItem("currentUser", JSON.stringify(userObj));
          this.router.navigate(['/home']);

          // get the current user  who logged in  from localstotage to save it in json user active
          this.idUserActive = JSON.parse(localStorage.getItem('currentUser')).id
          this.nameUserActive = JSON.parse(localStorage.getItem('currentUser')).userName

          loginForm.value.idUserActive = this.idUserActive
          loginForm.value.nameUserActive = this.nameUserActive

          this.service.postUserActive(loginForm.value).subscribe(data => {
            loginForm.value = data;
          })
          //
        }
        else {
          let emailError = document.getElementById('emailError');
          emailError.innerHTML = " Email is not exist";
        }
      }
    }


  }
}