import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WalletServiceProvider } from '../../providers/wallet-service/wallet-service';
/**
 * Generated class for the WalletPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wallet',
  templateUrl: 'wallet.html',
})
export class WalletPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public walletServiceProvider: WalletServiceProvider) {
      this.walletServiceProvider.checkLength()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WalletPage');
  }

}
