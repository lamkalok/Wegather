import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ItemContent, ActionSheetController, AlertController } from 'ionic-angular';
import { ShareServiceProvider } from '../../providers/share-service/share-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { GroupServiceProvider } from '../../providers/group-service/group-service';

/**
 * Generated class for the UserGroupsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-groups',
  templateUrl: 'user-groups.html',
})
export class UserGroupsPage {

  joinedGroup: any[];
  ownedGroup: any[];

  uid: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public shareServiceProvider: ShareServiceProvider,
    public authServiceProvider: AuthServiceProvider,
    public userServiceProvider: UserServiceProvider,
    public groupServiceProvider: GroupServiceProvider,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController
    ) {


    // let newPromise = new Promise((resolve, reject) => {
    //       resolve(this.authServiceProvider.userData.uid);
    // });
    
    // newPromise.then(uid=>{
    //   this.uid = uid;
    // })

    

    this.groupServiceProvider.getUserJoindedGroups(this.authServiceProvider.userData.joinedGroups).then((data)=>{
      console.log(data);    
      var uid = this.authServiceProvider.userData.uid
      this.ownedGroup = data.filter(function(item, index, array){
        if(item.owner == uid){
          return item;
        }
      })

      this.joinedGroup = data.filter(function(item, index, array){
        if(item.owner != uid){
          return item
        }
      })
      console.log("I am owner", this.ownedGroup);
      console.log("Joined Group", this.joinedGroup);
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserGroupsPage');
  }

  viewGroup(groupData){
    this.navCtrl.push("GroupDetailPage", groupData)
  }

  presentActionSheet() {
    var actionSheet = null;

    var page = "GroupAddPage";

      actionSheet = this.actionSheetCtrl.create({
        buttons: [
          {
            text: 'Create New Group',
            handler: () => {
              console.log('Create Event');
              this.navCtrl.push(page);
            }
          },
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
   
    actionSheet.present();
  }

}
