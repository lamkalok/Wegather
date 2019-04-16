import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WalletImportPage } from './wallet-import';

@NgModule({
  declarations: [
    WalletImportPage,
  ],
  imports: [
    IonicPageModule.forChild(WalletImportPage),
  ],
})
export class WalletImportPageModule {}
