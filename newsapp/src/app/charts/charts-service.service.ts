import { Injectable } from '@angular/core';
import { Component, NgModule } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ChartsService {
  API:string = 'http://127.0.0.1:3000/api';
  constructor(private authService: AuthService, private httpClient:HttpClient){}
   async newRead(){
     if(this.authService.isLoggedIn()){
     let mail = await this.authService.getEmail();
     this.httpClient.post(`${this.API}/user/newRead/`, {email:mail}).subscribe(
       (val) => {
           console.log("POST call successful value returned in body", val);
       },
       response => {
           console.log("POST call in error", response);
       },
       () => {
           console.log("The POST observable is now completed.");
        },
       );
     }
   }
   async newSearch(){
     if(this.authService.isLoggedIn()){
     let mail = await this.authService.getEmail();
     this.httpClient.post(`${this.API}/user/newSearch/`, {email:mail}).subscribe(
       (val) => {
           console.log("POST call successful value returned in body", val);
       },
       response => {
           console.log("POST call in error", response);
       },
       () => {
           console.log("The POST observable is now completed.");
        },
       );
     }
   }
   async newLogin(){
     if(this.authService.isLoggedIn()){
     let mail = await this.authService.getEmail();
     this.httpClient.post(`${this.API}/user/newLogin/`, {email:mail}).subscribe(
       (val) => {
           console.log("POST call successful value returned in body", val);
       },
       response => {
           console.log("POST call in error", response);
       },
       () => {
           console.log("The POST observable is now completed.");
        },
       );
     }
   }
}
