import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EthereumProvider } from '../../providers/ethereum/ethereum';
import { ShareServiceProvider } from '../../providers/share-service/share-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { WalletServiceProvider } from '../../providers/wallet-service/wallet-service';

/**
 * Generated class for the WalletListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wallet-list',
  templateUrl: 'wallet-list.html',
})
export class WalletListPage {

  wallet: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public ethereumProvider: EthereumProvider,
    public shareServiceProvider: ShareServiceProvider,
    public authServiceProvider: AuthServiceProvider,
    public userServiceProvider: UserServiceProvider,
    public walletServiceProvider: WalletServiceProvider) {
      this.walletServiceProvider.getWallet().then(w=>{
        this.wallet = w;
        this.wallet.forEach(acc => {
          // this.ethereumProvider.checkBalance(acc.address).then(bal=>{
          //   acc.balance = bal;
          // })
        });
      })

      // this.ethereumProvider.checkBalance("0xd68D71c39B8548E04cD92931142c1B1Dadb33D77").then(b=>{
      //   console.log(b);
      // });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WalletListPage');
  }

  viewWalletDetail(account){
    this.navCtrl.push("WalletDetailPage", account);
  }
}
