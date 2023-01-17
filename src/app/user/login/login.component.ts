import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { IUser } from './user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  users:IUser[]=[];
pageTitle:string='Log In';
  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit(): void {this.authService.fetchAllUsers().subscribe(data=>this.users=data)}
  
  onSubmit(loginForm:NgForm){
    if(loginForm && loginForm.valid){
      const userName = loginForm.form.value.userName;
      const password=loginForm.form.value.password;
   //this user is logged in
      
if(this.authService.validateUser({userName,password},this.users)){
  (confirm(`Login Succsessfull!!!`))

}else{
  (confirm(`Invalid Login!!! please try again`))
}
 
 console.log('after login  ')
  if(this.authService.redirectToUrl){
    this.router.navigateByUrl(this.authService.redirectToUrl);
  }
  else{
    this.router.navigate(['products']);
  }


    }

  }

}
