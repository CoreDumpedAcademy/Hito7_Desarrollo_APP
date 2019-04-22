import { User } from './../auth/user';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { NewsService } from 'src/service/news.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {

  email
  name
  lname
  uname
  aux
  error = ""
  currentemail


  constructor(private auth : AuthService, private router: Router, public service: NewsService) {
  }

  async ngOnInit() {
    this.uname = await this.auth.getEmail()
    this.service.getUser(this.uname).subscribe(
      (data)=>{
        this.aux = data
        this.aux = this.aux.user
        this.email = this.aux.email
        this.name = this.aux.firstName
        this.lname = this.aux.lastName
        this.uname = this.aux.userName
        this.currentemail = this.aux.email
      }
    )
  }

  edit(form){
    console.log(form.value)
    if(form.value.password != form.value.confirm){
      this.error = "Passwords do not match!"
    } else {
      this.service.checkPassword(form.value.email,form.value.oldpassword).subscribe(
        (data) => {
          this.error = "Loading..."
          if(form.value.password == ""){
            this.service.updateUser({
              userName: form.value.userName,
              firstName: form.value.firstName,
              lastName: form.value.lastName,
              email: form.value.email
            }, this.currentemail).subscribe(
              (data) => {
                this.auth.logOut()
                this.router.navigateByUrl('success')
              },
              (err) => {
                this.error = "Unexpected error."
              }
            )
          } else {
            this.service.updateUser({
              userName: form.value.userName,
              password: form.value.confirm,
              firstName: form.value.firstName,
              lastName: form.value.lastName,
              email: form.value.email
            }, this.currentemail).subscribe(
              (data) => {
                this.auth.logOut()
                this.router.navigateByUrl('success')
              },
              (err) => {
                this.error = "Unexpected error."
              }
            )
          }
        },
        (err) => {
          this.error = "Wrong password, access denied"
        }
      )

    }
  }

  goBack(){
    this.router.navigateByUrl('')
  }

  deactivate(){
    this.router.navigateByUrl('deleteuser')
  }
}
