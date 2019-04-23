import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PluginDetailPage } from './plugin-detail';

@NgModule({
  declarations: [
    PluginDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(PluginDetailPage),
  ],
})
export class PluginDetailPageModule {}
