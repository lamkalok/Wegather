import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserDetailPage } from './user-detail';
import { QRCodeModule } from 'angularx-qrcode';
@NgModule({
  declarations: [
    UserDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(UserDetailPage),
    QRCodeModule,
  ],
})
export class UserDetailPageModule {}
