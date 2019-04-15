import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController } from 'ionic-angular';
import { EthereumProvider } from '../../providers/ethereum/ethereum';
import { ShareServiceProvider } from '../../providers/share-service/share-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { WalletServiceProvider } from '../../providers/wallet-service/wallet-service';
/**
 * Generated class for the WalletDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wallet-detail',
  templateUrl: 'wallet-detail.html',
})
export class WalletDetailPage {

  account: any;
  myAngularxQrCode: string = null;
  address: string;
  weCoinBalance: any;
  ethBalance: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public ethereumProvider: EthereumProvider,
    public shareServiceProvider: ShareServiceProvider,
    public authServiceProvider: AuthServiceProvider,
    public userServiceProvider: UserServiceProvider,
    public walletServiceProvider: WalletServiceProvider,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController
    ) {
      console.log(this.navParams.data);
      this.account = this.navParams.data
      this.myAngularxQrCode = this.account.address;
      this.address = this.account.address;

      this.ethereumProvider.checkBalance(this.account.address).then(bal=>{
          this.weCoinBalance = bal;
      })

      this.ethereumProvider.checkEthBalance(this.account.address).then(bal=>{
        this.ethBalance = bal;
    })
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WalletDetailPage');
  }


  presentActionSheet() {
    var actionSheet = null;

    var page = "CreateEventPage";

      actionSheet = this.actionSheetCtrl.create({
        buttons: [
          {
            text: 'Export Private Key',
            handler: () => {
              console.log('Create Event');
              this.navCtrl.push(page);
            }
          },
          {
            text: 'Delete Account',
            handler: () => {
              const confirm = this.alertCtrl.create({
                title: "Delete Account'",
                message: "Are you sure to delete this account?",
                buttons: [
                  {
                    text: 'Disagree',
                    handler: () => {
                      confirm.dismiss();
                      console.log('Disagree clicked');
                      return false;
                    }
                  },
                  {
                    text: 'Agree',
                    handler: () => {
                      console.log('Agree clicked');
                      this.walletServiceProvider.deleteAccount(this.account.address).then(()=>{
                        this.shareServiceProvider.showToast("Account deleted");
                  
                        this.navCtrl.popTo(this.navCtrl.first());
                      });
                      return true;
                    }
                  }
                ]
              });
              confirm.present();
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
