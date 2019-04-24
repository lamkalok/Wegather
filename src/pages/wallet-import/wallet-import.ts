import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EthereumProvider } from '../../providers/ethereum/ethereum';
import { ShareServiceProvider } from '../../providers/share-service/share-service';
import { WalletServiceProvider } from '../../providers/wallet-service/wallet-service';

/**
 * Generated class for the WalletImportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wallet-import',
  templateUrl: 'wallet-import.html',
})
export class WalletImportPage {

  privateKey: string;
  password: string;
  password2: string;
  mnemonic: string; 
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public ethereumProvider: EthereumProvider,
    public shareServiceProvider: ShareServiceProvider,
    public walletServiceProvider: WalletServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WalletImportPage');
  }

  importAccountbyPrivate() {
    this.shareServiceProvider.showLoading();
    if(this.password == this.password2) {
      this.ethereumProvider.importAccountFromPrivateKey(this.privateKey).then(account=>{
        var address = account.address;
        this.ethereumProvider.encrypt(this.privateKey, this.password).then(keystone=>{
          this.walletServiceProvider.storeAccount(address, keystone).then((msg)=>{
            if(msg=="success"){
              this.shareServiceProvider.hideLoading();
              this.shareServiceProvider.showAlertWithTitle("Account import successfully", "Success");
              this.navCtrl.popTo(this.navCtrl.first());
            }
          })
        })
      })
    } else {
      this.shareServiceProvider.showAlert("The password must be the same as confirm password");
    }
  }

  async importAccountbyMnemonic() {
    try {
      if(this.password == this.password2) {
        var account = await this.ethereumProvider.generateAccountFromMnemonic(this.mnemonic);
        var address = account.address;
  
        this.ethereumProvider.encrypt(account.privateKey, this.password).then(keystone=>{
          this.walletServiceProvider.storeAccount(address, keystone).then((msg)=>{
            if(msg=="success"){
              this.shareServiceProvider.hideLoading();
              this.shareServiceProvider.showAlertWithTitle("Account import successfully", "Success");
              this.navCtrl.popTo(this.navCtrl.first());
            }
          })
        })
      }
    } catch(err) {
      this.shareServiceProvider.showAlert("Error:" + err);
    }

  }

}
