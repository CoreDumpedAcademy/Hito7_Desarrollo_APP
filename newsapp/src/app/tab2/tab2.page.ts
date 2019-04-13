import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  
      categories: Array <any> = [];
    
  
  constructor(public navCtrl: NavController){
    this.categories = [
      {name:'DEPORTE', img:'sports.jpg' },
      {name:'ECONOMÍA', img:'economy.jpg'},
      {name: 'TECNOLOGÍA', img:'technology.jpg'},
      {name: 'CIENCIA', img:'science.jpg'},
      {name:'SALUD', img: 'health.jpg'},
      {name: 'ENTRENAMIENTO', img:'entertainment.jpg'}
    ]
  }
  
  sliderConfig = {
   loop: true,
   initialSlide: 1,
   spaceBetween: 5,
   centeredSlides: true,
   slidesPerView: 2.3
  }

  //Funiones de la API

}
/* @mariam no se que es pero me da error xd
export class NewsPage implements OnInit {
  
}
*/
