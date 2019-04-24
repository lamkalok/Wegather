import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events } from 'ionic-angular';
import { ShareServiceProvider } from '../../providers/share-service/share-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { GroupServiceProvider } from '../../providers/group-service/group-service';
import { SponserServiceProvider } from '../../providers/sponser-service/sponser-service';
/**
 * Generated class for the SponserDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sponser-detail',
  templateUrl: 'sponser-detail.html',
})
export class SponserDetailPage {

  sponser: any;
  isClaim = false;
  uid: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public shareServiceProvider: ShareServiceProvider,
    public authServiceProvider: AuthServiceProvider,
    public groupServiceProvider: GroupServiceProvider,
    public sponserServiceProvider:SponserServiceProvider,
    public alertCtrl: AlertController,
    public events: Events) {
      this.sponser = this.navParams.data;
      if(this.sponser.claimedID.includes(this.authServiceProvider.getLoggedUID())) {
        this.isClaim = true;
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SponserDetailPage');
  }

  claimSponser() {
    const confirm = this.alertCtrl.create({
      title: "Are you sure?",
      message: "Are you confirm to take this sponser?",
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
            this.sponserServiceProvider.claimSponser(this.authServiceProvider.getLoggedUID(), this.sponser.name).then(() => {
              this.shareServiceProvider.showAlertWithTitle("Claim sponser sucessfully", "Great");
              this.isClaim = true;
              this.events.publish('sponser:claimed', this.sponser);
            })
            return true;
          }
        }
      ]
    });
    confirm.present();
  }

}
