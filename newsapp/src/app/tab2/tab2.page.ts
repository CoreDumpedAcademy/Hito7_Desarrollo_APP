import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NewsService } from '../../service/news.service';
import {AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  
      categories: Array <any> = [];
     
  constructor(public navCtrl: NavController, public service: NewsService, private authService: AuthService){
    this.categories = [
      {name:'sports', img:'sports.jpg' },
      {name:'business', img:'economy.jpg'},
      {name: 'technology', img:'technology.jpg'},
      {name: 'science', img:'science.jpg'},
      {name:'health', img: 'health.jpg'},
      {name: 'entertainment', img:'entertainment.jpg'},
      {name: 'general', img:'general.jpg'}

    ]
  }
  
  sliderConfig = {
   loop: true,
   initialSlide: 1,
   spaceBetween: 5,
   centeredSlides: true,
   slidesPerView: 2.3
  }

  //Actualizar pagina
  
  //Funciones de la API
  news
  articles
  page = 1;
  savecategory 
 
  //Cargar primeras noticias 
  ngOnInit() {
    this.service.readCategory(this.categories, this.page)
    .subscribe(
      (data) => {this.news = data;
        this.articles = this.news.articles
        console.log(data);},
       
      (error) => {console.log(error);}
    )
  }
  
  //Cargar por categoria
  async loadArticles(category){
    if(this.authService.isLoggedIn()){
      let mail = await this.authService.getEmail();
      await this.service.addCategoryView(category, mail);
    }
    this.page++;
    this.service.readCategory(category.name, this.page)
    .subscribe(
      (data) => {this.news = data;
        this.articles = this.news.articles
        console.log(data);},
       
      (error) => {console.log(error);}
    );this.savecategory = category;
  }

//Cargar más noticia Infinite Scroll
loadMoreArticles(event){
  console.log(event);

  this.page ++;
  if(this.savecategory===undefined) this.savecategory = "general"
  this.service.readCategory(this.savecategory.name, this.page)
  .subscribe(
    (data) => {
      console.log(data);
      this.news = data;
      this.articles = this.news.articles
      for(let i = 0; i < 5; i++){
        this.articles.push(this.articles[i]);
      } event.target.complete();
  });
}
saveNew(noticia){
  this.service.saveNew(noticia)
  .subscribe(
    (data) => {
      console.log(data)
    },
    (error) =>{
      console.log(error)
    }
  )
}
}


