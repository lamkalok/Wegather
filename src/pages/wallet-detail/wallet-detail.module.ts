import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WalletDetailPage } from './wallet-detail';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  declarations: [
    WalletDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(WalletDetailPage),
    QRCodeModule
  ],
})
export class WalletDetailPageModule {}
