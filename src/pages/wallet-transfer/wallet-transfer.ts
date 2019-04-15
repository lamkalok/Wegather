import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.toAddress = "toAddress";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WalletTransferPage');
  }

}
