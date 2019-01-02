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

  
  groups = [];
  count: number = 0;
  isValid: boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public groupServiceProvider: GroupServiceProvider
    ) {
    console.log(this.navParams);
    var data = this.navParams.data;
    if(data != null){
      try {
        data.forEach(element => {
          if(element.selected){
            console.log("selected cate: " + element.name);
            let groupNames = element.groups;
            if(groupNames!=undefined){
              groupNames.forEach(group => {
                groupServiceProvider.getGroup(element.name, group).then((g)=>{
                  this.groups.push(g);
                });
              });
            }
          }
        });
      } catch (error) {
        console.log(error);
      }
      
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterSelectGroupsPage');
  }

  joinGroup(group){
    if(group.joined){
      this.count--;
    }else{
      this.count++;
    }
    group.joined = !group.joined;
    if(this.count > 0){
      this.isValid = true;
    }else{
      this.isValid = false;
    }
  }

  nextPage(){
    this.navCtrl.push('RegisterPage', this.groups);
  }

}
