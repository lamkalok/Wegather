import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ShareServiceProvider } from '../../providers/share-service/share-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { GroupServiceProvider } from '../../providers/group-service/group-service';
import { EventServiceProvider } from '../../providers/event-service/event-service';
import { Observable } from 'rxjs';

/**
 * Generated class for the EventDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html',
})
export class EventDetailPage {
  event: Observable<any>;
  id: string;
  date_from: Date;
  date_to: Date;
  numberOfAttendedMembers: number;
  attendedMembers = [];
  organizerName: string;
  joinedThisEvent = false;;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public shareServiceProvider: ShareServiceProvider,
    public authServiceProvider: AuthServiceProvider,
    public userServiceProvider: UserServiceProvider,
    public groupServiceProvider: GroupServiceProvider,
    public eventServiceProvider: EventServiceProvider,
  ) {
    var eventSnapshot = navParams.data;
    this.id = eventSnapshot.id;

    if (this.id != null) {
      try {
        eventServiceProvider.getEvent(eventSnapshot.id).then((e) => {
          this.event = e;
          //subscribe is also real time update
          this.event.subscribe(e => {
            this.attendedMembers = [];
            console.log(e);
            this.date_from = e.date_from.toDate();
            this.date_to = e.date_to.toDate();
            this.numberOfAttendedMembers = e.attendedMembers.length;

            this.userServiceProvider.getUser(e.organizerID).then((organizer) => {
              this.organizerName = organizer.name;
            });

            e.attendedMembers.forEach(attendedMemberID => {
              if (attendedMemberID == this.authServiceProvider.getLoggedUID()) {
                this.joinedThisEvent = true;
              }
              this.userServiceProvider.getUser(attendedMemberID).then((user) => {
                this.attendedMembers.push(user);
              })
            });

          })
        });

      } catch (error) {

      }
    }



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventDetailPage');
  }

  goEvent() {
    console.log("goEvent");
    this.eventServiceProvider.addMemeberToEvent(this.authServiceProvider.getLoggedUID(), this.id).then(()=>{
      this.joinedThisEvent = true;
    });
    
  }

  quitEvent() {
    console.log("quitEvent");
    this.eventServiceProvider.removeMemberFromEvent(this.authServiceProvider.getLoggedUID(), this.id).then(()=>{
      this.joinedThisEvent = false;
    });
  }

}
