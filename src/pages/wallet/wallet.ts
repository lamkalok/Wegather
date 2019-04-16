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

  isNewWallet = true;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public walletServiceProvider: WalletServiceProvider) {
      this.walletServiceProvider.checkLength().then(length=>{
        console.log("length", length);
        if(length > 0) {
          this.walletServiceProvider.getWallet().then(w=>{
            console.log("wallet", w);
            console.log("wallet len", w.length);
            if(w != null && w.length > 0){
              this.isNewWallet = false;
            }
          })
        }
      })     
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WalletPage');
  }

  createAccount(){
    this.navCtrl.push("WalletCreatePage", this);
  }

  viewAccounts(){
    this.navCtrl.push("WalletListPage");
  }

}
