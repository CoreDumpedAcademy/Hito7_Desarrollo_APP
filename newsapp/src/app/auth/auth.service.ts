import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
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

        if (res.user) {
          await this.storage.set("ACCESS_TOKEN", res.user.access_token);
          await this.storage.set("EXPIRES_IN", res.user.expires_in);
          this.authSubject.next(true);
        }
      })

    );
  }
  login(user: User): Observable<AuthResponse>{
    return this.httpClient.post<AuthResponse>(`${this.AUTH_SERVER_ADDRESS}logUser`, user).pipe(
      tap(async (res: AuthResponse)=> {
        if(res.user){
          await this.storage.set("ACCESS_TOKEN", res.user.access_token);
          await this.storage.set("EXPIRES_IN", res.user.expires_in);
          this.authSubject.next(true);    
        }
      })
    );
  }
  async logOut(){
    await this.storage.remove("ACCESS_TOKEN");
    await this.storage.remove("EXPIRES_IN");
  }
  isLoggedIn(){
    return this.authSubject.asObservable();
  }

}
    