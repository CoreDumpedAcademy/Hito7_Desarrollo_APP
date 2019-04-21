import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    IonicStorageModule.forRoot(),
  ]
})
export class AuthModule { }
