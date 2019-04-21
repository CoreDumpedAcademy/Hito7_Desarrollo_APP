import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  currentArticle: any;

  constructor(public http: HttpClient) { 
    console.log('News service ok');
  }

  //Devolver noticias por categoría
  readCategory(category, page){
    return this.http.get(`http://localhost:3000/api/news/topheadlines?category=${category}&pageSize=5&page=${page}`);
  }
  //Devolver noticias por actualidad
  readNews(page){
    return this.http.get(`http://localhost:3000/api/news/everything?lang=en&pageSize=5&page=${page}`);
  }
  readNewsFilter(page,lang,sortBy,from,until){
    return this.http.get(`http://localhost:3000/api/news/everything?lang=${lang}&from=${from}&until=${until}&pageSize=5&page=${page}&sortBy=${sortBy}`);
  }
}
