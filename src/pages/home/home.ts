import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GroupServiceProvider } from '../../providers/group-service/group-service';
import { Observable } from 'rxjs';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  groups: Observable<any[]>;
  constructor(
    public navCtrl: NavController,
    public groupService: GroupServiceProvider,
    ) {
    this.groups = this.groupService.getGroups();
  }

  createNewGroup(){
    this.navCtrl.push('GroupAddPage');
  }

  
}
