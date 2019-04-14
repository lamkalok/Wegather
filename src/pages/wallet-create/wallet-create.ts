import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EthereumProvider } from '../../providers/ethereum/ethereum';
import { ShareServiceProvider } from '../../providers/share-service/share-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { WalletServiceProvider } from '../../providers/wallet-service/wallet-service';
/**
 * Generated class for the WalletCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wallet-create',
  templateUrl: 'wallet-create.html',
})
export class WalletCreatePage {

  mnemonic: any;
  account: any;
  address: any;
  password: string;
  password2: string;
  walletPage: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public ethereumProvider: EthereumProvider,
    public shareServiceProvider: ShareServiceProvider,
    public authServiceProvider: AuthServiceProvider,
    public userServiceProvider: UserServiceProvider,
    public walletServiceProvider: WalletServiceProvider) {
      this.walletPage = this.navParams.data;
      this.mnemonic = this.ethereumProvider.generateMnemonic();
      this.account = this.ethereumProvider.generateAccountFromMnemonic(this.mnemonic);
      this.address = this.account.address;
      console.log(this.mnemonic);
      console.log("account", this.account);
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WalletCreatePage');
  }

  generateNewAccount(){
    this.mnemonic = this.ethereumProvider.generateMnemonic();
    this.account = this.ethereumProvider.generateAccountFromMnemonic(this.mnemonic);
    this.address = this.account.address;
    console.log("account", this.account);
  }

  createAccount(){
    this.shareServiceProvider.showLoading();
    if(this.password == this.password2){
      this.ethereumProvider.encrypt(this.account.privateKey, this.password).then(keystone=>{
        console.log("keystone", keystone);

        this.ethereumProvider.decrypt(keystone, this.password).then(acc=>{
          console.log("acc", acc);
        })
        this.walletServiceProvider.storeAccount(this.address, keystone).then((result)=>{
          console.log(result);
          this.shareServiceProvider.hideLoading();
          this.shareServiceProvider.showAlertWithTitle("Account create successfully", "Success");
          this.walletPage.isNewWallet = false;
          this.navCtrl.pop();
        });
        
      })
    } else {
      this.shareServiceProvider.showAlert("Please input the same password");
      this.shareServiceProvider.hideLoading();
    }
  }

}
