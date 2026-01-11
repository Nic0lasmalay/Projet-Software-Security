import { Component } from '@angular/core';
import {InputHomePageComponent} from '../input-home-page/input-home-page.component';
import {AuthService} from '../../services/authService/auth-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-account-creation-page',
  standalone: true,
  imports: [
    InputHomePageComponent
  ],
  templateUrl: './account-creation-page.component.html',
  styleUrl: './account-creation-page.component.css'
})
export class AccountCreationPageComponent {


  constructor(private authService: AuthService,private router:Router) {
  }
  password:string="";
  username:string="";
  errorMessage:string="";


  onCreateAccount(){
    this.errorMessage="";
    const user ={
      username : this.username,
      password: this.password
    }
    this.authService.registerUser(user).subscribe({
      next:(res)=>{
        localStorage.setItem('token',res.token);
        this.router.navigate(["notes"]);
      },
      error:(err)=>{
        this.errorMessage=err.error.error || "Erreur lors de l'inscription";
      }
    });
  }
}
