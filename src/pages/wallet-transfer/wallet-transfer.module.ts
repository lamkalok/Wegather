import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WalletTransferPage } from './wallet-transfer';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@NgModule({
  declarations: [
    WalletTransferPage,
  ],
  imports: [
    IonicPageModule.forChild(WalletTransferPage),
  ],
  providers: [BarcodeScanner]
})
export class WalletTransferPageModule {}
