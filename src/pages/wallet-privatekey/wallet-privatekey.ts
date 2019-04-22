import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WalletServiceProvider } from '../../providers/wallet-service/wallet-service';
import { ClipboardService } from 'ngx-clipboard'
import { EthereumProvider } from '../../providers/ethereum/ethereum';
import { ShareServiceProvider } from '../../providers/share-service/share-service';

/**
 * Generated class for the WalletPrivatekeyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wallet-privatekey',
  templateUrl: 'wallet-privatekey.html',
})
export class WalletPrivatekeyPage {

  password: string;
  account: any;
  privateKey: string; 
  show = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private _clipboardService: ClipboardService,
    public walletServiceProvider: WalletServiceProvider,
    public ethereumProvider: EthereumProvider,
    public shareServiceProvider: ShareServiceProvider,
    ) {
      this.account = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WalletPrivatekeyPage');
  }

  copyPrivateKey() {
    this._clipboardService.copyFromContent(this.privateKey);
    this.shareServiceProvider.showToast("PrivateKey copied");
  }

  export() {
    try {
      this.ethereumProvider.decrypt(this.account.keystone, this.password).then(acc => {
        console.log(acc);
        this.privateKey = acc.privateKey;
        this.show = true;
      })
    } catch (err) {
      console.log(err);
      this.shareServiceProvider.showAlert(err);
    }
  }
}
