import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
var moment = require('moment');

@Component({
  selector: 'app-modal-filters',
  templateUrl: './modal-filters.page.html',
  styleUrls: ['./modal-filters.page.scss'],
})
export class ModalFiltersPage implements OnInit {

  lang;
  sortBy;
  fromDate;
  untilDate;
  minDate;
  maxDate;

  
  
  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
  ) {
    this.lang='en'
    this.sortBy='popularity'
  }

  ngOnInit() {
    console.table(this.navParams);
    this.minDate = moment().subtract(1,'months').format()
    this.maxDate = moment().format()
    if(this.fromDate===undefined){
      this.fromDate=this.minDate
    }
    if(this.untilDate===undefined){
      this.untilDate=this.maxDate
    }
    console.table(this.navParams);
  }


  async closeModal() {
    const settings = {
      lang:this.lang,
      sortBy:this.sortBy,
      fromDate:moment(this.fromDate).toISOString(),
      untilDate:moment(this.untilDate).toISOString(),
    }
    await this.modalController.dismiss(settings);
  }


}
