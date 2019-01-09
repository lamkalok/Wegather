import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ShareServiceProvider } from '../../providers/share-service/share-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { GroupServiceProvider } from '../../providers/group-service/group-service';
import { User } from "../../data/user.interface";
import { Observable } from 'rxjs';
import { initDomAdapter } from '@angular/platform-browser/src/browser';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  groupsObs: Observable<any>[];
  groups = [];
  userImg: string;
  constructor(
    public navCtrl: NavController,
    public shareServiceProvider: ShareServiceProvider,
    public authServiceProvider: AuthServiceProvider,
    public userServiceProvider: UserServiceProvider,
    public groupServiceProvider: GroupServiceProvider,

  ) {
    // this.authServiceProvider.login("17200083@life.hkbu.edu.hk", "aaaa1111").then((currentUser)=>{
    //   console.log(this.authServiceProvider.isLoggedIn());
    //   console.log(this.authServiceProvider.userData);
    //   this.groupServiceProvider.getUserJoindedGroups(this.authServiceProvider.userData.joinedGroups).then((data)=>{
    //     console.log(data);
    //     this.groups = data;
    //   });
    //   console.log(this.authServiceProvider.userData);
    //   this.authServiceProvider.currentUserInfo();
    // });

    this.userImg = this.authServiceProvider.userData.img;

    try {

      this.userServiceProvider.getUserJoinedGroupRealTime(this.authServiceProvider.getLoggedUID()).then((ubs) => {
        ubs.subscribe(uwt => {

          var userData: any = uwt.payload.data();
          console.log(userData.joinedGroups);
          userData.joinedGroups.forEach(groupID => {
            this.groups = [];
            console.log(groupID);
            this.groupServiceProvider.getUserJoinedGroupsRealTime(groupID).then((gbs) => {
              gbs.subscribe(gwt => {
                console.log(gwt.payload.data());
                var g: any = gwt.payload.data();
                g.id = gwt.payload.id;
                if (g.eventsSnapshot != undefined) {
                  if (g.eventsSnapshot.length > 0) {
                    g.eventsSnapshot.forEach(eventsSp => {
                      eventsSp.date_from = eventsSp.date_from.toDate();
                    });
                  }
                }

                var updated = false;
                for (var i = 0; i < this.groups.length; i++) {
                  if (this.groups[i].id == g.id) {
                    this.groups.splice(i, 1, g);
                    updated = true;
                    break;
                  }
                }
                if(!updated)
                  this.groups.push(g);
                
              })
            });
          });
          

        })
      });
    } catch (error) {

    }

    /** Old method -> not real time */
    // this.groupServiceProvider.getUserJoindedGroups(this.authServiceProvider.userData.joinedGroups).then((data)=>{
    //   //console.log(data);
    //   this.groups = data;
    // });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  createNewGroup() {
    this.navCtrl.push('GroupAddPage');
  }

  joinNewGroup() {
    this.navCtrl.push('RegisterSelectCategoriesPage');
  }

  groupDetail(group) {
    this.navCtrl.push('GroupDetailPage', group);
  }

  eventDetail(event) {
    this.navCtrl.push('EventDetailPage', event);
  }


}
