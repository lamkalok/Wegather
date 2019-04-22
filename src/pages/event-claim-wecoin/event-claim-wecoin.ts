import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ShareServiceProvider } from '../../providers/share-service/share-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { GroupServiceProvider } from '../../providers/group-service/group-service';
import { EventServiceProvider } from '../../providers/event-service/event-service';

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
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public shareServiceProvider: ShareServiceProvider,
    public authServiceProvider: AuthServiceProvider,
    public userServiceProvider: UserServiceProvider,
    public groupServiceProvider: GroupServiceProvider,
    public eventServiceProvider: EventServiceProvider,) {
      this.eventID = this.navParams.data;
      console.log(this.eventID);
      this.eventServiceProvider.getAttendanceRecord(this.eventID).then(rec => {
        rec.forEach(element => {
          console.log("attend record", element);
          this.userServiceProvider.getUser(element).then(user => {
            this.attendedRecord.push(user);
          })
        });
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventClaimWecoinPage');
  }

}
