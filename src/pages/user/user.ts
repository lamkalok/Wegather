import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ShareServiceProvider } from '../../providers/share-service/share-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { GroupServiceProvider } from '../../providers/group-service/group-service';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { Events } from 'ionic-angular';


/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {

  userData: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public shareServiceProvider: ShareServiceProvider,
    public authServiceProvider: AuthServiceProvider,
    public userServiceProvider: UserServiceProvider,
    public groupServiceProvider: GroupServiceProvider,
    public events: Events
  ) {
    this.userData = authServiceProvider.userData;
    console.log(this.userData);

    events.subscribe('user:updated', (user) => {
      this.userData.name = user.name;
      this.userData.img = user.img;
      this.userData.phone = user.phone;
      this.userData.email = user.email;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPage');
  }

  async logOut() {
    // await this.navCtrl.parent.parent.setRoot(LoginPage);
    var events = this.events;
    this.authServiceProvider.logout().then(async function(){
      events.publish('logout', true);
    });

  }

  viewUserDetail() {
    this.navCtrl.push("UserDetailPage", this.authServiceProvider.getLoggedUID());
  }

  viewGroups() {
    this.navCtrl.push("UserGroupsPage");
  }

  viewWallet() {
    this.navCtrl.push("WalletPage")
  }

}
