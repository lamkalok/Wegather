import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SponserDetailPage } from './sponser-detail';

@NgModule({
  declarations: [
    SponserDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(SponserDetailPage),
  ],
})
export class SponserDetailPageModule {}
