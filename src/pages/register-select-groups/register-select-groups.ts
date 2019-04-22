import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GroupServiceProvider } from '../../providers/group-service/group-service';
import { ShareServiceProvider } from '../../providers/share-service/share-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { TabsPage } from '../tabs/tabs';
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
    public groupServiceProvider: GroupServiceProvider,
    public shareServiceProvider: ShareServiceProvider,
    public authServiceProvider: AuthServiceProvider,
    public userServiceProvider: UserServiceProvider,
    ) {
    console.log(this.navParams);
    this.authServiceProvider.currentUserInfo();
    console.log("Logined", this.authServiceProvider.isLoggedIn())
    var data = this.navParams.data;
    if(data != null && !this.authServiceProvider.isLoggedIn()){
      try {
        this.groups = [];
        data.forEach(element => {
          if(element.selected){
            console.log("selected cate: " + element.name);
            let groupNames = element.groups;
            if(groupNames!=undefined){
              groupNames.forEach(group => {
                groupServiceProvider.getGroup(element.name, group).then((g)=>{
                  this.groups.push(g);
                  console.log(g );
                });
              });
            }
          }
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        this.groups = [];
        data.forEach(element => {
          if(element.selected){
            console.log("selected cate: " + element.name);
            let groupNames = element.groups;
            if(groupNames!=undefined){
              groupNames.forEach(group => {
                groupServiceProvider.getGroup(element.name, group).then((g)=>{
                  if(g!=null)
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
    var joinedGroup = [];
    if(this.authServiceProvider.isLoggedIn()){
      this.shareServiceProvider.showLoading();
      var groupProcessed = 0;
      this.groups.forEach(element => {
        
        if (element.joined) {
          
          joinedGroup.push(element.id);
          
          
        }
        console.log(joinedGroup);
        groupProcessed++;

        if(groupProcessed==this.groups.length){
          //console.log(joinedGroup);
          var uid = this.authServiceProvider.getLoggedUID();
          this.groupServiceProvider.addMemberToGroup(uid, joinedGroup).then(()=>{
            this.userServiceProvider.addGroupToUser(uid, joinedGroup, this.authServiceProvider).then(()=>{
              this.shareServiceProvider.hideLoading();
              this.shareServiceProvider.showToast("Join group successfully");
              this.navCtrl.setRoot(TabsPage);
              this.navCtrl.popToRoot();
            })
          }); 
        }
      });
    }else {
      this.navCtrl.push('RegisterPage', this.groups);
    }
    
  }

}
