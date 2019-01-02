import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ShareServiceProvider } from '../../providers/share-service/share-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { GroupServiceProvider } from '../../providers/group-service/group-service';
import { User } from "../../data/user.interface";
import { Observable } from 'rxjs';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  groups: Observable<any[]>;
  constructor(
    public navCtrl: NavController,
    public shareServiceProvider: ShareServiceProvider,
    public authServiceProvider: AuthServiceProvider,
    public userServiceProvider: UserServiceProvider,
    public groupServiceProvider: GroupServiceProvider
    ) {
    this.groups = this.groupServiceProvider.getUserJoinedGroups(this.authServiceProvider.userData.joinedGroups);
    console.log(this.authServiceProvider.userData);
    this.authServiceProvider.currentUserInfo();
  }

  createNewGroup(){
    this.navCtrl.push('GroupAddPage');
  }

  
}
