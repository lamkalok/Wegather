import { Component, group } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController } from 'ionic-angular';
import { ShareServiceProvider } from '../../providers/share-service/share-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { GroupServiceProvider } from '../../providers/group-service/group-service';
import { EventServiceProvider } from '../../providers/event-service/event-service';
import { Group } from '../../data/group.interface';
import { TabsPage } from '../tabs/tabs';

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
    public shareServiceProvider: ShareServiceProvider,
    public authServiceProvider: AuthServiceProvider,
    public userServiceProvider: UserServiceProvider,
    public groupServiceProvider: GroupServiceProvider,
    public eventServiceProvider: EventServiceProvider,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController
  ) {
    this.group = navParams.data;
    
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
    var actionSheet = null;
    // Not the group owner
    if(this.group.owner != this.authServiceProvider.getLoggedUID()){
      actionSheet = this.actionSheetCtrl.create({
      
        buttons: [
          {
            text: 'Quit Group',
            role: 'destructive',
            handler: () => {
              const confirm = this.alertCtrl.create({
                title: "Are you sure to quit this group?",
                message: "Reminder: You will also quit all of the event you have been joined",
                buttons: [
                  {
                    text: 'No',
                    handler: () => {
                      console.log('No clicked'); 
                    }
                  },
                  {
                    text: 'Yes',
                    handler: () => {
                      var uid = this.authServiceProvider.getLoggedUID();
                      console.log('Yes clicked');
                      if(this.group.eventsSnapshot!=undefined){
                        this.group.eventsSnapshot.forEach(element=>{
                          this.eventServiceProvider.removeMemberFromEvent(uid, element.id);
                        });
                      }
                      this.userServiceProvider.removeGroupFromUser(uid, this.group.id, this.authServiceProvider).then(()=>{
                        this.groupServiceProvider.removeMebmerFromGroup(uid, this.group.id).then(()=>{
                          this.shareServiceProvider.showToast("Quit group successfully");
                          this.navCtrl.setRoot(TabsPage);
                          this.navCtrl.popToRoot();
                        });
                      });
                      
                    }
                  }
                ]
              });
              confirm.present();
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
    }else { // is the group owner
      actionSheet = this.actionSheetCtrl.create({
      
        buttons: [
          {
            text: 'Organize New Event',
            handler: () => {
              console.log('Create Event');
              this.navCtrl.push("CreateEventPage", this.group.id);
            }
          },
          {
            text: 'Delete Group',
            role: 'destructive',
            handler: () => {
              console.log('Destructive clicked');
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
    }
    

    actionSheet.present();
  }

  eventDetail(eventsSnapshot){
    this.navCtrl.push("EventDetailPage", eventsSnapshot)
  }

}
