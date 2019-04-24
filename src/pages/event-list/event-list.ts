import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ShareServiceProvider } from '../../providers/share-service/share-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { GroupServiceProvider } from '../../providers/group-service/group-service';
import { EventServiceProvider } from '../../providers/event-service/event-service';
/**
 * Generated class for the EventListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-list',
  templateUrl: 'event-list.html',
})
export class EventListPage {

  pastEvent = [];
  upcomingEvent = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public shareServiceProvider: ShareServiceProvider,
    public authServiceProvider: AuthServiceProvider,
    public userServiceProvider: UserServiceProvider,
    public groupServiceProvider: GroupServiceProvider,
    public eventServiceProvider: EventServiceProvider) {
      var now = Date.now();
      this.eventServiceProvider.getAllEvents().then(eventArray => {
        eventArray.forEach(event => {
          console.log("event", event);
          event.attendedMembers.forEach(element => {
            if(element == this.authServiceProvider.getLoggedUID()) {
              var dataFrom = event.date_from.toDate();
              if(now > dataFrom.getTime()) {
                this.pastEvent.push(event);
              } else {
                this.upcomingEvent.push(event);
              }
            }
          });
        })
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventListPage');
  }

  viewEvent(event) {
    event.id = event.name;
    this.navCtrl.push("EventDetailPage", event);
  }

}
