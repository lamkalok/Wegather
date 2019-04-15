import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { EthereumProvider } from '../../providers/ethereum/ethereum';
import { ShareServiceProvider } from '../../providers/share-service/share-service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

// import { QRScanner, QRScannerStatus } from 'cordova-plugin-qrscanner';

/**
 * Generated class for the WalletTransferPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wallet-transfer',
  templateUrl: 'wallet-transfer.html',
})
export class WalletTransferPage {

  toAddress: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private barcodeScanner: BarcodeScanner,
    public ethereumProvider: EthereumProvider,
    public shareServiceProvider: ShareServiceProvider,
  ) {
    this.toAddress = "toAddress";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WalletTransferPage');
  }

  scan() {
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData.text);
      this.shareServiceProvider.showToast(barcodeData.text);
     }).catch(err => {
         console.log('Error', err);
     });
  }

}
