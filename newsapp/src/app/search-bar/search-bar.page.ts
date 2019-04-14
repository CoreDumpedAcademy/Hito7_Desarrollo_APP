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
  public news:ApiResponse;
  public keyWords:string;
  constructor(  public httpClient: HttpClient) { }
  apiUrl = 'http://127.0.0.1:3000/api/news/topHeadLines?';
  search():Observable<ApiResponse>{
    this.httpClient.get<ApiResponse>(`${this.apiUrl}q=${this.keyWords}&category=business`).subscribe(
      (data) => console.log(data),
      (err) => console.log(err)
    );
    return 
  }
  consola(){
    console.log('Esto no es lo que falla...');
  }
  ngOnInit() {
  }

}
