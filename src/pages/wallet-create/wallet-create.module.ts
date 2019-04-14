import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WalletCreatePage } from './wallet-create';

@NgModule({
  declarations: [
    WalletCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(WalletCreatePage),
  ],
})
export class WalletCreatePageModule {}
