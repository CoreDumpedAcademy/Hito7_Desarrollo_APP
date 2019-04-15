import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NewsService } from '../../service/news.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  
      categories: Array <any> = [];
      news
  
  constructor(public navCtrl: NavController, public service: NewsService){
    this.categories = [
      {name:'sports', img:'sports.jpg' },
      {name:'business', img:'economy.jpg'},
      {name: 'technology', img:'technology.jpg'},
      {name: 'science', img:'science.jpg'},
      {name:'health', img: 'health.jpg'},
      {name: 'entertainment', img:'entertainment.jpg'},
      {name: 'general', img:'general.jpg'}

    ]
  }
  
  sliderConfig = {
   loop: true,
   initialSlide: 1,
   spaceBetween: 5,
   centeredSlides: true,
   slidesPerView: 2.3
  }

  //Actualizar pagina

  //Funiones de la API
  ionViewDidLoad(categories){
    this.service.readCategory(categories.name)
    .subscribe(
      (data) => {this.news = data;
        console.log(data);},
      (error) => {console.log(error);}
    )
  }
}

