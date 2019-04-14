import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


/**
 * Generated class for the UsersListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-users-list',
  templateUrl: 'users-list.html',
})
export class UsersListPage {

  membersList = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.membersList = this.navParams.data;
    console.log(this.membersList);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsersListPage');
  }

  startChat(member){
    this.navCtrl.push('MessageDetailPage', member);
  }

}
