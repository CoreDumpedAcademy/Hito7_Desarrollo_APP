import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { tap } from  'rxjs/operators';
import { Observable, BehaviorSubject } from  'rxjs';

import { Storage } from  '@ionic/storage';
import { User } from  './user';
import { AuthResponse } from  './auth-response';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  AUTH_SERVER_ADDRESS: string = 'http://127.0.0.1:3000/api/';
  authSubject = new BehaviorSubject(false);

  constructor(private httpClient: HttpClient, private storage: Storage){

   
  }
  register(user: User): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.AUTH_SERVER_ADDRESS}user`, user).pipe(
      tap(async (res:  AuthResponse ) => {

        if (res.token) {
          await this.storage.set("ACCESS_TOKEN", res.token);
          await this.storage.set("USER_EMAIL", user.email);
          this.authSubject.next(true);
        }
      })

    );
  }
  login(user: User): Observable<AuthResponse>{
    let userMail = user.email;
    console.log('Guardamos: ' + userMail);
    return this.httpClient.post<AuthResponse>(`${this.AUTH_SERVER_ADDRESS}logUser`, user).pipe(
      tap(async (res: AuthResponse)=> {
        if(res.token){
          await this.storage.set("ACCESS_TOKEN", res.token);
          await this.storage.set("USER_EMAIL", userMail);
          this.authSubject.next(true);    
        }
      })
    );
  }
  async logOut(){
    await this.storage.remove("ACCESS_TOKEN");
    await this.storage.remove("USER_EMAIL");

  }
  /*
   async isLoggedIn(){
    const userToken = await this.storage.get("ACCESS_TOKEN");//await this.storage.get("ACCESS_TOKEN");
    let logged = false;
    const httOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded',
        'authorization': userToken,
      })
    }
     this.httpClient.get<AuthResponse>(`${this.AUTH_SERVER_ADDRESS}user/private`,httOptions).pipe(
       tap(async (res: AuthResponse) =>{
         if(res.logged != null){
          logged = await res.logged;
          console.log("El usuario se ha logueado?" + logged);
         }

       }

    ));

      return logged;
  }
  */
  isLoggedIn(){
    return !(this.storage.get("USER_EMAIL") == undefined)
  }
  async setEmail(email:string){
    await this.storage.set("USER_eMAIL", email);
  }
   async getEmail(){
    let mail = await this.storage.get("USER_EMAIL");
    return mail; 
  }

}
    