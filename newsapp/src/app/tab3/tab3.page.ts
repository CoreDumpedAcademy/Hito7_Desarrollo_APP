import { Component } from '@angular/core';
import { NewsService } from '../../service/news.service';
import {AuthService } from '../auth/auth.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

export class Tab3Page {
  constructor(public service: NewsService, private authService: AuthService, private router: Router){}

  news;
  user;
  logged:boolean;
  async getFavNews(){
    this.user  = await this.authService.getEmail();// user debería ser el usuario actual, si está logueado 
    console.log('User ' + this.user)
    this.service.getUser(this.user)
    .subscribe(
      (data) =>{
        this.news = data
        console.log(this.news)
        this.user = this.news.user.userName
        if(this.news.user.favNews.length == 0){
          this.news.user.favNews.push({
            title:"Pioliin's team welcomes you!",
            content:"Thank you for downloading our app and creating an account! Your support means the world to us! Your saved news will be stored here",
            urlToImage: "../../../assets/images/default-images/fondos.png"
          })
        }
      },
      (error) => {
        console.log(error)
      }
    )
  }

  async ngOnInit() {
    this.logged = await this.authService.isLoggedIn();
    console.log("LOGGED NO VA? " + this.logged);
    if(!this.logged){
      this.router.navigateByUrl('login');

    }
    this.getFavNews();
  }
  deleteArt(index){
    this.service.deleteArt(index)
    .subscribe(
      (data) => {
        console.log("Article deleted correctly")
        this.getFavNews()
      },
      (err) => { console.log(err) }
    )
  }
  readArt(article){
    window.open(article.url)
  }
}
