import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from './api-response';
import { HttpParams } from '@angular/common/http';
import { tap } from  'rxjs/operators';
import { Observable, BehaviorSubject } from  'rxjs';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  
      categories: Array <any> = [];
      public category:string = '';
      public keyWords:string = '';
      private apiUrl = 'http://127.0.0.1:3000/api/news/';
      public news = null;
      public searchedNews: boolean = false;

  constructor(public navCtrl: NavController, private httpClient: HttpClient,){
    this.categories = [
      {name:'sport', img:'sports.jpg' },
      {name:'business', img:'economy.jpg'},
      {name: 'technology', img:'technology.jpg'},
      {name: 'science', img:'science.jpg'},
      {name:'health', img: 'health.jpg'},
      {name: 'entertaiment', img:'entertainment.jpg'}
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

