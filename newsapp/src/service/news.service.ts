import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(public http: HttpClient) { 
    console.log('News service ok');
  }

  readNews(){
    return this.http.get('http://localhost:3000/api/news/everything');
  }
}
