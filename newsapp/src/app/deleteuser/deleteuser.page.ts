import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewsService } from 'src/service/news.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-deleteuser',
  templateUrl: './deleteuser.page.html',
  styleUrls: ['./deleteuser.page.scss'],
})
export class DeleteuserPage implements OnInit {

  password
  err = ""

  constructor(public router: Router, public service : NewsService, public auth: AuthService) {
    this.password = this
  }

  ngOnInit() {
  }

  async delete(form){
    var email
    var pwd = form.form.value.password
    await this.auth.getEmail().then((data)=>{email = data})
    var bool:Boolean
    if(pwd == "")
      this.err = "You must enter your password before deleting your user"
    else{
      this.service.checkPassword(email,pwd).subscribe(
        (data) => {
          if(confirm("Are you really sure you want to continue?")){
            this.service.deleteUser(email).subscribe(
              (data) => {
                alert("Your data will be kept for a month. It is so sad to see you go :(")
                this.router.navigateByUrl('login')
              },
              (err) => {
                this.err = "Wrong password. Change denied."
              }
            )
          }
        },
        (err) => {
          this.err = "Wrong password. Change denied."
        }
      )
    }
  }

  goBack(){
    this.router.navigateByUrl('')
  }

}
