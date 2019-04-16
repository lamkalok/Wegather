import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController } from 'ionic-angular';
import { EthereumProvider } from '../../providers/ethereum/ethereum';
import { ShareServiceProvider } from '../../providers/share-service/share-service';
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
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    public ethereumProvider: EthereumProvider,
    public shareServiceProvider: ShareServiceProvider,
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

  presentActionSheet() {
    var actionSheet = null;

      actionSheet = this.actionSheetCtrl.create({
        buttons: [
          {
            text: 'Create Account',
            handler: () => {
              console.log('Create Account');
              this.navCtrl.push("WalletCreatePage");
            }
          },
          {
            text: 'Import Account',
            handler: () => {
              console.log('Import Account');
              this.navCtrl.push("WalletImportPage");
            }
          },
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
   
    actionSheet.present();
  }


}
