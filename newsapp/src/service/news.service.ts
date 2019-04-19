import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

const API = "http://localhost:3000/api"
const USER = "Pochu" // Este campo representa el usuario actual. Como en esta rama no está implementada la autentificación, habrá que sustituirlo por el usuario loggeado actualmente.

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
    return this.http.get(`http://localhost:3000/api/news/topheadlines?pageSize=5&page=${page}`);
  }
  readeverything(){
    return this.http.get(`${API}/news/everything`);
  }

  saveNew(noticia){
    console.log(noticia)
    return this.http.put(`${API}/favNews/${USER}`, noticia)
  }

  getUser(user){
    return this.http.get(`${API}/username/${user}`)
  }

  deleteArt(index){
    return this.http.put(`${API}/favNews/${USER}/${index}`,{})
  }
}
