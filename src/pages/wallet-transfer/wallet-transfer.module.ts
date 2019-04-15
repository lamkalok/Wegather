import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WalletTransferPage } from './wallet-transfer';

@NgModule({
  declarations: [
    WalletTransferPage,
  ],
  imports: [
    IonicPageModule.forChild(WalletTransferPage),
  ],
})
export class WalletTransferPageModule {}
