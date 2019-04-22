import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../service/settings.service';
import { ToastController } from '@ionic/angular';
import { NewsService } from '../../service/news.service';
import { AuthService } from '../auth/auth.service'

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  user
  usuario
  lang
  country
  favLang
  favCountry
  gotLang
  gotCountry
  id
  gotid

  constructor(public service: SettingsService, public toastController: ToastController, public newsservice: NewsService, private authService: AuthService) {
    this.lang = 'en'
    this.country = 'us'
    this.gotLang = false
    this.gotCountry = false
    this.gotid = false
  }

  async ngOnInit() {
    this.user = await this.authService.getEmail();// user debería ser el usuario actual, si está logueado 
    await this.newsservice.getUser(this.user).subscribe(
      async (data) => {
        this.usuario = await data
        this.id = this.usuario.user._id
        this.gotid=true
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
      },
      (error) => {
        console.log(error)
      }
    )
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

  async onNightMode() {
    const toast = await this.toastController.create({
      message: 'Night mode not implemented yet :(',
      duration: 2000
    });
    toast.present();
  }


}
