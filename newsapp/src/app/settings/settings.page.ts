import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../service/settings.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  lang;
  country
  favLang
  favCountry
  gotLang
  gotCountry
  id = '5caf599e46f70034cf7ba93d' //todo change id to actual id you want to update

  constructor(public service: SettingsService, public toastController: ToastController) {
    this.lang = 'en'
    this.country = 'us'
    this.gotLang = false
    this.gotCountry = false
  }

  async ngOnInit() {
    await this.service.getLangFav(this.id).subscribe(async (data) => {
      this.favLang = await data
      this.gotLang = true
      this.lang = this.favLang.user.preferences.favLanguage
    })
    await this.service.getCountryFav(this.id).subscribe(async (data) => {
      this.favCountry = await data
      this.gotCountry = true
      this.country = this.favCountry.user.preferences.favCountry
    })

  }


  onLangChange() {
    console.log("Idioma seleccionado: " + this.lang)

    this.service.updateLang(this.id, this.lang).subscribe(async (data) => {
      console.log(data)
      const toast = await this.toastController.create({
        message: 'Updated language!',
        duration: 2000
      });
      toast.present();
    },
      (error) => {
        console.log(error)
      })


  }

  onCountryChange() {
    console.log("País seleccionado: " + this.country)

    this.service.updateCountry(this.id, this.country).subscribe(async (data) => {
      console.log(data)
      const toast = await this.toastController.create({
        message: 'Updated country!',
        duration: 2000
      });
      toast.present();
    },
      (error) => {
        console.log(error)
      })
  }


}
