import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WalletPrivatekeyPage } from './wallet-privatekey';
import { ClipboardModule } from 'ngx-clipboard';
@NgModule({
  declarations: [
    WalletPrivatekeyPage,
  ],
  imports: [
    IonicPageModule.forChild(WalletPrivatekeyPage),
    ClipboardModule,
  ],
})
export class WalletPrivatekeyPageModule {}
