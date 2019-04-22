import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../service/news.service';
import { ChartsService } from '../charts/charts-service.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.page.html',
  styleUrls: ['./article.page.scss'],
})
export class ArticlePage implements OnInit {
  article;
  constructor(private service: NewsService, private chartService: ChartsService) { }

  async ngOnInit() {
    this.article = this.service.currentArticle;
    await this.chartService.newRead();
    console.log(this.service.currentArticle);
  }

}
