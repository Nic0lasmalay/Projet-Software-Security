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
    this.router.navigate(["account_creation"]);
  }
  onLogin(){
    this.errorMessage="";
    this.isButtonLoginClicked = true;
    const user ={
      username : this.username,
      password: this.password
    }
    this.authService.login(user).subscribe({
      next:(res)=>{
        this.router.navigate(["notes"]);
      },
      error:(err)=>{
        this.errorMessage=err.error.error || "Erreur lors de la connexion";
      }
    })
  }




}
