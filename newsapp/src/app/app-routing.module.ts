import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'settings', loadChildren: './settings/settings.module#SettingsPageModule' },
  { path: 'article', loadChildren: './article/article.module#ArticlePageModule' },
  { path: 'register', loadChildren: './auth/register/register.module#RegisterPageModule' },
  { path: 'login', loadChildren: './auth/login/login.module#LoginPageModule' },
  { path: 'modal-filters', loadChildren: './modal-filters/modal-filters.module#ModalFiltersPageModule' },
  { path: 'edit-user', loadChildren: './edit-user/edit-user.module#EditUserPageModule' },
  { path: 'success', loadChildren: './success/success.module#SuccessPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

