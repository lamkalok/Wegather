import { Component } from '@angular/core';
import { NavController,AlertController } from 'ionic-angular';
import { GroupServiceProvider } from '../../providers/group-service/group-service';
import { Observable } from 'rxjs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  groups: Observable<any[]>;
  list = [
    {name:"assets/imgs/card1.png"},
    {name:"assets/imgs/card1.png"},
    {name:"assets/imgs/card1.png"},
    {name:"assets/imgs/card1.png"},
    {name:"assets/imgs/card1.png"},
    {name:"assets/imgs/card1.png"},
    {name:"assets/imgs/card1.png"},
    {name:"assets/imgs/card1.png"},
  ];
  constructor(
    public navCtrl: NavController,
    public groupService: GroupServiceProvider,
    ) {
    this.groups = this.groupService.getGroups();
  }

}
