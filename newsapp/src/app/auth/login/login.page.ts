import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from '../auth.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public error:string = '';
  constructor(private authService: AuthService, private router: Router) { }
  login(form){
    this.authService.login(form.value).subscribe((res) => {
      if(this.authService.isLoggedIn()){
        this.router.navigateByUrl('');
      }else{
        this.error = "No se ha podido iniciar sesión";
      }
    })
  }
  ngOnInit() {
  }

}
