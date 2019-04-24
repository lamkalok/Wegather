import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ShareServiceProvider } from '../../providers/share-service/share-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { GroupServiceProvider } from '../../providers/group-service/group-service';
import { EventServiceProvider } from '../../providers/event-service/event-service';
import { WalletServiceProvider } from '../../providers/wallet-service/wallet-service';
import { EthereumProvider } from '../../providers/ethereum/ethereum';
/**
 * Generated class for the EventClaimWecoinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-claim-wecoin',
  templateUrl: 'event-claim-wecoin.html',
})
export class EventClaimWecoinPage {

  eventID: string;
  attendedRecord = [];
  attendedCount: number;
  numberOfWeCoinClaim: number;
  wallet: any;
  selectedAccount: any;
  eventDetailPage: any;
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
    public alertCtrl: AlertController
    ) {
      this.eventID = this.navParams.data.eventId;
      // this.eventDetailPage = this.navParams.data.eventDetailPage;
      console.log(this.eventID);
      this.eventServiceProvider.getAttendanceRecord(this.eventID).then(rec => {
        this.attendedCount = rec.length;
        this.numberOfWeCoinClaim = rec.length;
        rec.forEach(element => {
          console.log("attend record", element);
          this.userServiceProvider.getUser(element).then(user => {
            this.attendedRecord.push(user);
          })
        });
      })

      this.walletServiceProvider.getWallet().then(w=>{
        this.wallet = w;
        console.log(this.wallet);
      })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventClaimWecoinPage');
  }

  claimWeCoin() {
    
    console.log(this.selectedAccount);
    const confirm = this.alertCtrl.create({
      title: "Are you sure",
      message: "Are you sure to claim " + this.numberOfWeCoinClaim + " with account: " + this.selectedAccount.address,
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
            try {
              this.shareServiceProvider.showLoadingWithCustomContent("Please wait, it may take a long time...");
              console.log('Agree clicked');
              this.ethereumProvider.claimWeCoin(this.selectedAccount.address, this.numberOfWeCoinClaim).then(receipt => {
                console.log("receipt", receipt);
                var rec = receipt;
                this.eventServiceProvider.addClaimedToEvent(this.eventID).then(()=>{
                  this.shareServiceProvider.hideLoading();
                  this.confirmTransferSuccess("The block hash: " + receipt.blockHash);
                })
              })
            } catch(err) {
              this.shareServiceProvider.hideLoading();
              this.shareServiceProvider.showAlert("Error: " + err);
            }
          }
        }
      ]
    });
    confirm.present();
  }

  confirmTransferSuccess(msg){
    const confirm = this.alertCtrl.create({
      title: "Success",
      message: "WeCoin Claim Succsessfully! " + msg,
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
