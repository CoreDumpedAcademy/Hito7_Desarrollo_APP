import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../service/news.service';
var moment = require('moment');

@Component({
  selector: 'app-article',
  templateUrl: './article.page.html',
  styleUrls: ['./article.page.scss'],
})
export class ArticlePage implements OnInit {
  article;
  constructor(private service: NewsService) { }

  ngOnInit() {
    this.article = this.service.currentArticle;
    console.log(this.service.currentArticle);
  }
  fecha(fechaISO) {
    return moment(fechaISO).format('DD/MM/YYYY')
  }
  readArt(article){
    window.open(article.url)
  }
}
