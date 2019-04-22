import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ShareServiceProvider } from '../../providers/share-service/share-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { GroupServiceProvider } from '../../providers/group-service/group-service';
import { LoginPage } from '../login/login';

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
    ) {
      this.userData = authServiceProvider.userData;
      console.log(this.userData);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPage');
  }

  logOut(){
    // this.navCtrl.popAll();
    this.navCtrl.setRoot(LoginPage);
    this.navCtrl.popToRoot();
    // window.location.reload();
    // this.navCtrl.popToRoot();
    this.authServiceProvider.logout();
  }

  viewGroups(){
    this.navCtrl.push("UserGroupsPage");
  }

  viewWallet(){
    this.navCtrl.push("WalletPage")
  }

}
