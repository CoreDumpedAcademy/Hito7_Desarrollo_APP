import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

const API = "http://localhost:3000/api"
const USER = "Pochu" // Este campo representa el usuario actual. Como en esta rama no está implementada la autentificación, habrá que sustituirlo por el usuario loggeado actualmente.

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(public http: HttpClient) { 
    console.log('News service ok');
  }

  readNews(){
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
