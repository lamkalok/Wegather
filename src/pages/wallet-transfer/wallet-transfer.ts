import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { EthereumProvider } from '../../providers/ethereum/ethereum';
import { ShareServiceProvider } from '../../providers/share-service/share-service';

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
    
    public ethereumProvider: EthereumProvider,
    public shareServiceProvider: ShareServiceProvider,
  ) {
    this.toAddress = "toAddress";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WalletTransferPage');
  }

  scan() {

    // QRScanner.scan(displayContents);
 
    // function displayContents(err, text){
    //   if(err){
    //     // an error occurred, or the scan was canceled (error code `6`)
    //   } else {
    //     // The scan completed, display the contents of the QR code:
    //     alert(text);
    //   }
    // }
     
    // // Make the webview transparent so the video preview is visible behind it.
    // QRScanner.show();

  }

}
