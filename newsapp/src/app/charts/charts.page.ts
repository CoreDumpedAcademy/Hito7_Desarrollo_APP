import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { single } from './data';
@Component({
  selector: 'app-charts',
  templateUrl: './charts.page.html',
  styleUrls: ['./charts.page.scss'],
})
export class ChartsPage implements OnInit {


  constructor() {
    Object.assign(this, { single })
  }

  onSelect(event) {
    console.log(event);
  }



  ngOnInit() {
  }

}
