import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ShareServiceProvider } from '../../providers/share-service/share-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { GroupServiceProvider } from '../../providers/group-service/group-service';
import { EventServiceProvider } from '../../providers/event-service/event-service';
import { WalletServiceProvider } from '../../providers/wallet-service/wallet-service';
import { EthereumProvider } from '../../providers/ethereum/ethereum';
import { PluginServiceProvider } from '../../providers/plugin-service/plugin-service';
/**
 * Generated class for the PluginDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-plugin-detail',
  templateUrl: 'plugin-detail.html',
})
export class PluginDetailPage {

  groupID: string;
  plugin: any;
  wallet: any;
  selectedAccount: any;
  password: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public shareServiceProvider: ShareServiceProvider,
    public authServiceProvider: AuthServiceProvider,
    public userServiceProvider: UserServiceProvider,
    public groupServiceProvider: GroupServiceProvider,
    public eventServiceProvider: EventServiceProvider,
    public walletServiceProvider: WalletServiceProvider,
    public ethereumProvider: EthereumProvider,
    public pluginServiceProvider: PluginServiceProvider,
    public alertCtrl: AlertController,
    ) {

      console.log(this.navParams.data);

      this.groupID = this.navParams.data.groupID;
      this.plugin = this.navParams.data.plugin;

      this.walletServiceProvider.getWallet().then(w=>{
        this.wallet = w;
        this.wallet.forEach(acc => {
          this.ethereumProvider.checkBalance(acc.address).then(bal=>{
            acc.balance = bal;
          })
        });
      })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PluginDetailPage');
  }

  buyPlugin() {
    const confirm = this.alertCtrl.create({
      title: "Are you sure?",
      message: "Are you confirm to buy this plugin into your group?",
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            confirm.dismiss();
            return false;
          }
        },
        {
          text: 'Agree',
          handler: () => {
            if(this.selectedAccount.balance >= this.plugin.cost) {
              this.shareServiceProvider.showLoadingWithCustomContent("Please wait, it may take a long time...");
              try {

                this.ethereumProvider.decrypt(this.selectedAccount.keystone, this.password).then(acc => {
                  this.ethereumProvider.buyPluginByWeCoin(acc, this.plugin.cost).then(receipt => {
                    this.pluginServiceProvider.buyPlugin(this.groupID, this.plugin.name).then(() => {
                      this.shareServiceProvider.hideLoading();
                      this.confirmTransferSuccess("The block hash: " + receipt.blockHash);
                    })
                  })
                  
                })

              } catch (err) {
                this.shareServiceProvider.hideLoading();
                this.shareServiceProvider.showAlert("Error: " + err);
              }
            } else {
              this.shareServiceProvider.showAlert("Sorry, you don't have enough WeCoin.");
            }
            return true;
          }
        }
      ]
    });
    confirm.present();
  }

  confirmTransferSuccess(msg){
    const confirm = this.alertCtrl.create({
      title: "Success",
      message: "Plugin Purchase Succsessfully! " + msg,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            console.log('OK clicked');
            this.navCtrl.popTo(this.navCtrl.first());
          }
        }
      ]
    });
    confirm.present();
  }

}
