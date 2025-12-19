import {Component, Input} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {InputHomePageComponent} from '../input-home-page/input-home-page.component';
import {AuthService} from '../../services/authService/auth-service.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    InputHomePageComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  isButtonLoginClicked : boolean = false;
  isButtonCreateAccountClicked : boolean = false;

  protected username : string ="";
  protected password: string="";

  errorMessage : string ="";
  constructor(private router : Router, private authService : AuthService ) { }

  onCreateAccount(){
    this.errorMessage="";
    this.isButtonCreateAccountClicked = true;
    const user ={
      username : this.username,
      password: this.password
    }
    this.authService.registerUser(user).subscribe({
      next:(res)=>{
        console.log("Utilisateur créé!",res);
      },
      error:(err)=>{
        this.errorMessage=err.error.error || "Erreur lors de l'inscription";
      }
    });
  }
  onLogin(){
    this.isButtonLoginClicked = true;
  }




}
