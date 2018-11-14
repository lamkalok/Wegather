import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterSelectCategoriesPage } from './register-select-categories';

@NgModule({
  declarations: [
    RegisterSelectCategoriesPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterSelectCategoriesPage),
  ],
})
export class RegisterSelectCategoriesPageModule {}
