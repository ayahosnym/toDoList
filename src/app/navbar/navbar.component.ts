import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  userActive = [];
  idUserActive
  constructor(private service: TodoService, private router: Router) {

    this.service.getUserActive().subscribe((data: any) => {
      this.userActive = data;
    })
  }

  logout() {
    this.service.deleteUserActive(this.userActive[0].id).subscribe(data => {
      console.log(data);
    })

    localStorage.removeItem('currentUser');
    this.router.navigate(['/']);
  }
  ngOnInit() {
  }

}
