

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TodoService } from '../todo.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  registerForm: FormGroup;
  usersInfo;
  foundedEmail
  Uid;
  userFormInfo;
  foundUser: any;
  constructor(private fb: FormBuilder, private service: TodoService, private router: Router) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      userName: ["", [Validators.required, Validators.pattern('^[a-z|A-Z]+(?: [a-z|A-Z]+)*$')]],
      email: ["", [Validators.required, Validators.pattern('^[a-zA-Z0-9._-]+@[a-zA-Z]{2,}\.[a-zA-Z]{2,}$')]],
      password: ["", [Validators.required, Validators.minLength(5), Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[a-zA-Z0-9].{4,}$')]],
    });

    this.service.getUserData().subscribe(data => {
      return this.usersInfo = data;
    })
  }

  onSubmit(registerForm) {
    if (registerForm.valid) 
      this.userFormInfo = registerForm.value;
      console.log(1)
      this.foundUser = this.usersInfo.find(user => user.email == this.userFormInfo.email);
      if (this.foundUser) {
        let emailError = document.getElementById('emailError')
        emailError.innerHTML = "email is exist"
      } 
      else {
        this.service.postUserData(this.userFormInfo).subscribe(data => {
          this.userFormInfo = data;

          localStorage.setItem("currentUser", JSON.stringify(this.userFormInfo));
          this.router.navigate(['/home']);
        })
      }
    
    
  }


}
