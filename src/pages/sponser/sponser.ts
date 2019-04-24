import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { ShareServiceProvider } from '../../providers/share-service/share-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { GroupServiceProvider } from '../../providers/group-service/group-service';
import { SponserServiceProvider } from '../../providers/sponser-service/sponser-service';

/**
 * Generated class for the SponserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sponser',
  templateUrl: 'sponser.html',
})
export class SponserPage {

  isOwner:boolean = false;
  groupSponser = [];
  memberSponser = [];
  claimedSponser = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public shareServiceProvider: ShareServiceProvider,
    public authServiceProvider: AuthServiceProvider,
    public groupServiceProvider: GroupServiceProvider,
    public sponserServiceProvider:SponserServiceProvider,
    public events: Events
    ) {
      events.subscribe('sponser:claimed', (sponser) => {

        this.claimedSponser.push(sponser);
        if(sponser.type=="group") {
          for(var i = 0; i < this.groupSponser.length; i++) {
            if(this.groupSponser[i].name == sponser.name)
              this.groupSponser.splice(i, 1);
          }
        } else {
          for(var j = 0; i < this.memberSponser.length; j++) {
            if(this.memberSponser[i].name == sponser.name)
              this.memberSponser.splice(j, 1);
          }
        }
      });


      var uid = this.authServiceProvider.getLoggedUID();
      this.groupServiceProvider.isGroupOwner(this.authServiceProvider.getLoggedUID()).then(isowner => {
        this.isOwner = isowner;
        this.sponserServiceProvider.getSponser().then(sponsersArray => {
          console.log(sponsersArray);
          sponsersArray.forEach(sponser => {
            if(sponser.claimedID.includes(uid)){
              this.claimedSponser.push(sponser);
            } else {
              if(sponser.type == "group") {
                this.groupSponser.push(sponser);
              } else {
                this.memberSponser.push(sponser);
              }
            }
          })
        })
      })
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SponserPage');
  }

  viewSponser(sponser) {
    this.navCtrl.push("SponserDetailPage", sponser);
  }

}
