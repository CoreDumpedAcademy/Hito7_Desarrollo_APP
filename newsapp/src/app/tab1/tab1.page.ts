import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NewsService } from '../../service/news.service';
import { IonInfiniteScroll } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  categories: Array <any> = [];

  constructor(public navCtrl: NavController, public service: NewsService, private router: Router){
    
    this.categories = [
       {name: 'general', img:'general.jpg'}
    ]
  }

  
    //Funiones de la API
    news
    articles
    page = 1;
   
    ngOnInit() {
      this.service.readNews(this.page).subscribe(
        (data) => {this.news = data;
          this.articles = this.news.articles
          console.log(data);})
    }
  
    //Mostrar noticia en otra tab 
    goToArticle(article){
      this.service.currentArticle = article;
      this.router.navigate(['/article']);
    }

    //Cargar más noticiad Infinite Scroll
    loadArticles(event){
      console.log(event);

      this.page ++;
      this.service.readNews(this.page)
      .subscribe(
        (data) => {
          console.log(data);
          this.news = data;
          this.articles = this.news.articles
          for(let i = 0; i < 5; i++){
            this.articles.push(this.articles[i]);
          } event.target.complete();
      })
    }
}
