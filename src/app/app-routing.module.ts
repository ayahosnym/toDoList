import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogInComponent } from './log-in/log-in.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LandingPageComponent } from './landing-page/landing-page.component';


const routes: Routes = [

  { path: "home", component: HomeComponent },         
  { path: "", component: LandingPageComponent },         
  { path: "login", component: LogInComponent },         
  { path: "signup", component: SignUpComponent },         
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
