import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GroupServiceProvider } from '../../providers/group-service/group-service';

/**
 * Generated class for the RegisterSelectGroupsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register-select-groups',
  templateUrl: 'register-select-groups.html',
})
export class RegisterSelectGroupsPage {

  selectedCategories: any[];
  groups = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public groupServiceProvider: GroupServiceProvider
    ) {
    console.log(this.navParams);
    var data = this.navParams.data;
    if(data != null){
      data.forEach(element => {
        if(element.selected){
          console.log("selected cate: " + element.name);
          let groupNames = element.groups;
          groupNames.forEach(group => {
            groupServiceProvider.getGroup(element.name, group).then((g)=>{
              this.groups.push(g);
            });
          });
        }
      });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterSelectGroupsPage');
  }

  joinGroup(group){
    group.joined = !group.joined;
  }

}
