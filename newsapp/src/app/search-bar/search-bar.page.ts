import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from './api-response';
import { HttpParams } from '@angular/common/http';
import { SearchParams } from './search-params'
import { tap } from  'rxjs/operators';
import { Observable, BehaviorSubject } from  'rxjs';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.page.html',
  styleUrls: ['./search-bar.page.scss'],
})
export class SearchBarPage implements OnInit {
  public news = null;
  public keyWords:string;
  public category:string;
  public newsCategories = [];
  constructor(  public httpClient: HttpClient) { }
  apiUrl = 'http://127.0.0.1:3000/api/news/';
  search(){
    this.news = null;
    this.httpClient.get<ApiResponse>(`${this.apiUrl}everything?q=${this.keyWords}&category=${this.category}`).subscribe(
       (data) =>{
         console.log(data);
         this.news = data;
         this.news = this.news.response;
        },
       (err) => console.log(err)
    );
  }

  ngOnInit() {
    this.category ='';
    this.keyWords ='';
    this.newsCategories = [
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology"]
    for(let i = 0; i < 7; i++ ){
      console.log(this.newsCategories[i]);
    }

  }

}
