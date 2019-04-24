import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventDetailPage } from './event-detail';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { IonicImageViewerModule } from 'ionic-img-viewer';
@NgModule({
  declarations: [
    EventDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(EventDetailPage),
    IonicImageViewerModule 
  ],
  providers: [BarcodeScanner]
})
export class EventDetailPageModule {}
