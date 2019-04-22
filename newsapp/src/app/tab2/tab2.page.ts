import { AuthService } from './../auth/auth.service';
import { NavController } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from './api-response';
import { HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { NewsService } from '../../service/news.service';
import { SettingsService } from '../service/settings.service';
import { ModalFiltersPage } from '../modal-filters/modal-filters.page';
import { Router } from '@angular/router';
var moment = require('moment');
import {ChartsService} from '../charts/charts-service.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
      category: string
      categories: Array <any> = [];
      searchedNews:boolean;
      public keyWords:string = '';
      private apiUrl = 'http://127.0.0.1:3000/api/news/';
      news;
      articles;
      page = 1;
      savecategory;
  constructor(public navCtrl: NavController, public service: NewsService, private authService: AuthService, private httpClient:HttpClient, private router: Router, private chartService: ChartsService, private settingsservice: SettingsService){
    this.categories = [
      { name: 'sports', img: 'sports.jpg' },
      { name: 'business', img: 'economy.jpg' },
      { name: 'technology', img: 'technology.jpg' },
      { name: 'science', img: 'science.jpg' },
      { name: 'health', img: 'health.jpg' },
      { name: 'entertainment', img: 'entertainment.jpg' },
      { name: 'general', img: 'general.jpg' }
    ]
  }

  //Funiones de la API
  gotnews = false
  country
  lang
  gotLang
  gotCountry
  favLang
  favCountry
  user
  usuario
  gotid
  id

  sliderConfig = {
    loop: true,
    initialSlide: 1,
    spaceBetween: 5,
    centeredSlides: true,
    slidesPerView: 2.3
  }

  openCategory(cat) {
    this.category = cat.name;
    console.log(this.category)
    this.loadArticles(cat)
  }

  //Funiones de la API
 async search(){
    this.gotnews = false
    this.news = null;
    this.searchedNews = true;
    if(this.category==='') this.category = 'general'
    this.keyWords.toLocaleLowerCase();
    this.chartService.newSearch();
    this.httpClient.get<ApiResponse>(`${this.apiUrl}everything?q=${this.keyWords}&category=${this.category}`).subscribe(
       (data) =>{
         console.log(data);
         this.news = data;
         this.news = this.news.response;
         this.gotnews = true
        },
       (err) => console.log(err)
    );
    let splittedKeyword = this.keyWords.split(' ');
    if(this.authService.isLoggedIn()){
      let mail = await this.authService.getEmail();
      splittedKeyword.forEach((element) => {
        this.service.addKeyWordView(element, mail)
  
      });
    }
  }

  //Mostrar noticia en otra tab 
  goToArticle(article) {
    this.service.currentArticle = article;
    this.router.navigate(['/article']);
  }

  //Cargar primeras noticias 
  async ngOnInit() {
    var bool = await this.authService.isLoggedIn()
    if (!bool) {
      this.router.navigateByUrl('login')
    }
    this.user = await this.authService.getEmail();// user debería ser el usuario actual, si está logueado 
    await this.service.getUser(this.user).subscribe(
      async (data) => {
        this.usuario = await data
        this.id = this.usuario.user._id
        this.gotid = true
        await this.settingsservice.getLangFav(this.id).subscribe(async (data) => {
          this.favLang = await data
          this.gotLang = true
          this.lang = this.favLang.user.preferences.favLanguage
          await this.settingsservice.getCountryFav(this.id).subscribe(async (data) => {
            this.favCountry = await data
            this.gotCountry = true
            this.country = this.favCountry.user.preferences.favCountry
            this.loadArticles('general')
            this.service.readCategory(this.categories, this.page, this.country)
              .subscribe(
                (data) => {
                  this.news = data;
                  this.articles = this.news.articles
                  console.log(data);
                  console.log(this.country)
                },

                (error) => { console.log(error); }
              )
          })
        })
      },
      (error) => {
        console.log(error)
      }
    )


  }

  //Cargar por categoria
  async loadArticles(category) {
    this.page = 1;
    console.log(category)
    if( this.authService.isLoggedIn()){
      let mail =  await this.authService.getEmail();
      console.log("Mandamos: " + mail + ':'+ category.name);
      this.service.addCategoryView(category.name, mail);
    }
    this.service.readCategory(category, this.page, this.country)
      .subscribe(
        (data) => {
          this.news = data
          this.searchedNews = true;
          this.articles = this.news.articles
          this.gotnews = true
          console.log(data)
        },

        (error) => { console.log(error); }
      );
    this.savecategory = category;
  }

  //Cargar más noticia Infinite Scroll
  loadMoreArticles(event) {
    console.log(event);

    this.page++;
    if (this.savecategory === undefined) this.savecategory = "general"
    this.service.readCategory(this.savecategory.name, this.page, this.country)
      .subscribe(
        (data) => {
          console.log(data);
          this.news = data;
          this.articles = this.news.articles
          for (let i = 0; i < 5; i++) {
            this.articles.push(this.articles[i]);
          } event.target.complete();
        });
  }
  saveNew(noticia) {
    this.service.saveNew(noticia)
      .subscribe(
        (data) => {
          console.log(data)
        },
        (error) => {
          console.log(error)
        }
      )
  }
}
