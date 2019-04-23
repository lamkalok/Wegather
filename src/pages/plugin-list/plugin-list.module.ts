import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PluginListPage } from './plugin-list';

@NgModule({
  declarations: [
    PluginListPage,
  ],
  imports: [
    IonicPageModule.forChild(PluginListPage),
  ],
})
export class PluginListPageModule {}
