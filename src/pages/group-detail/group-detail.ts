import { Component, group } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { Group } from '../../data/group.interface';

/**
 * Generated class for the GroupDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-group-detail',
  templateUrl: 'group-detail.html',
})
export class GroupDetailPage {

  group: Group
  numberOfMember: number

  membersInGroup = [];
  organizers = [];
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userServiceProvider: UserServiceProvider,
    public actionSheetCtrl: ActionSheetController
  ) {
    this.group = navParams.data;
    console.log(this.group.id);
    try {
      this.numberOfMember = this.group.members.length;

      this.group.organizers.forEach(element => {
        this.userServiceProvider.getUser(element).then((memberData) => {
          this.organizers.push(memberData);

        })
      });



      this.group.members.forEach(member => {
        this.userServiceProvider.getUser(member).then((memberData) => {
          this.membersInGroup.push(memberData);
          console.log(memberData);
        })
      })
    } catch (error) {
      console.log(error);
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupDetailPage');
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Modify your album',
      buttons: [
        {
          text: 'Destructive',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
          }
        },
        {
          text: 'Archive',
          handler: () => {
            console.log('Archive clicked');
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

  eventDetail(eventsSnapshot){
    this.navCtrl.push("EventDetailPage", eventsSnapshot)
  }

}
