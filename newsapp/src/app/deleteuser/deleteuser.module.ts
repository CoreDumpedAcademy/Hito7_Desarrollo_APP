import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DeleteuserPage } from './deleteuser.page';

const routes: Routes = [
  {
    path: '',
    component: DeleteuserPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DeleteuserPage]
})
export class DeleteuserPageModule {}
