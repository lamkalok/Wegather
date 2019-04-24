import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ShareServiceProvider } from '../../providers/share-service/share-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { GroupServiceProvider } from '../../providers/group-service/group-service';
import { EventServiceProvider } from '../../providers/event-service/event-service';

/**
 * Generated class for the UserDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-detail',
  templateUrl: 'user-detail.html',
})
export class UserDetailPage {

  userData: any;
  myAngularxQrCode: string = null;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public groupService: GroupServiceProvider,
    public shareServiceProvider: ShareServiceProvider,
    public authServiceProvider: AuthServiceProvider,
    public userServiceProvider: UserServiceProvider,
    public eventServiceProvider: EventServiceProvider,) {
      var uid = this.navParams.data;
      this.userServiceProvider.getUser(uid).then(user => {
        this.userData = user;
        this.myAngularxQrCode = this.userData.uid;
        console.log(this.userData);
      })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserDetailPage');
  }

}
