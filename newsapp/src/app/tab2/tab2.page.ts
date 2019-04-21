import { NavController } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from './api-response';
import { HttpParams } from '@angular/common/http';
import { tap } from  'rxjs/operators';
import { Observable, BehaviorSubject } from  'rxjs';
import { NewsService } from '../../service/news.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  
    categories: Array <any> = [];
    public category:string = '';
    public keyWords:string = '';
    private apiUrl = 'http://127.0.0.1:3000/api/news/';
    public news = null;
    public searchedNews: boolean = false;
  
  constructor(public navCtrl: NavController, public service: NewsService){
    this.categories = [
      {name:'sports', img:'sports.jpg' },
      {name: 'business', img:'economy.jpg'},
      {name: 'technology', img:'technology.jpg'},
      {name: 'science', img:'science.jpg'},
      {name: 'health', img: 'health.jpg'},
      {name: 'entertainment', img:'entertainment.jpg'},
      {name: 'general', img:'general.jpg'}
    ]
  }

  gotnews = false
  
  sliderConfig = {
   loop: true,
   initialSlide: 1,
   spaceBetween: 5,
   centeredSlides: true,
   slidesPerView: 2.3
  }
  openCategory(cat){
    this.category = cat.name; 
  }
  //Funiones de la API
  search(){
    this.gotnews = false
    this.news = null;
    this.searchedNews = true;
    if(this.category===undefined) this.category = 'general'
    this.httpClient.get<ApiResponse>(`${this.apiUrl}everything?q=${this.keyWords}&category=${this.category}`).subscribe(
       (data) =>{
         console.log(data);
         this.news = data;
         this.news = this.news.response;
         this.gotnews = true
        },
       (err) => console.log(err)
    );
  }
}


  //Actualizar pagina
  
  //Funiones de la API
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
  loadArticles(category){
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
    this.service.readCategory(this.savecategory.name, this.page).subscribe((data) => 
    {
        console.log(data);
        this.news = data;
        this.articles = this.news.articles
        for(let i = 0; i < 5; i++){
          this.articles.push(this.articles[i]);
        } 
        event.target.complete();
    });
  }
}

