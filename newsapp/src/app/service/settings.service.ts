import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  constructor(public http: HttpClient) { 
    console.log('Setting service is OK!');
  }

  updateLang(id,lang){
    return this.http.put(`http://localhost:3000/api/user/lang/${id}/${lang}`,{})
  }

  updateCountry(id,country){
    return this.http.put(`http://localhost:3000/api/user/country/${id}/${country}`,{})
  }

  getLangFav(id){
    return this.http.get(`http://localhost:3000/api/user/lang/${id}`)
  }
  
  getCountryFav(id){
    return this.http.get(`http://localhost:3000/api/user/country/${id}`)
  }
  
}
