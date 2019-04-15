import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WalletDetailPage } from './wallet-detail';
import { QRCodeModule } from 'angularx-qrcode';
import { ClipboardModule } from 'ngx-clipboard';
@NgModule({
  declarations: [
    WalletDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(WalletDetailPage),
    QRCodeModule,
    ClipboardModule,
  ],
})
export class WalletDetailPageModule {}
