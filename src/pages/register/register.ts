import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ShareServiceProvider } from '../../providers/share-service/share-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { GroupServiceProvider } from '../../providers/group-service/group-service';
import { User } from "../../data/user.interface";
import { TabsPage } from '../tabs/tabs';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  email: string;
  password: string;
  password2: string;
  name: string;
  phone: string;
  user: User;

  joinedGroups = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public shareServiceProvider: ShareServiceProvider,
    public authServiceProvider: AuthServiceProvider,
    public userServiceProvider: UserServiceProvider,
    public groupServiceProvider: GroupServiceProvider
  ) {
    //console.log(navParams.data);
    try {
      var groups = navParams.data;
      groups.forEach(element => {
        if (element.joined) {
          console.log(element);
          this.joinedGroups.push(element.id);
        }
      });
    } catch (error) {
      console.log(error);
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');

  }

  register() {



    var regex = new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9])(?=.{8,})");

    if (this.password == this.password2) {

      if (this.password.match(regex)) {

        this.shareServiceProvider.showLoading();

        this.authServiceProvider.signup(this.email, this.password).then(value => {

          var Uid = this.authServiceProvider.getLoggedUID();

          this.user = {
            uid: Uid,
            img: "https://firebasestorage.googleapis.com/v0/b/wegather-dcb52.appspot.com/o/Users%2Fuser.jpg?alt=media&token=c744108d-36a8-493d-ada4-de5f859118df",
            name: this.name,
            email: this.email,
            phone: this.phone,
            joinedGroups: this.joinedGroups,
          }

          console.log("UID: " + Uid);

          try {
            this.userServiceProvider.createUser(this.user, Uid).then(() => {
              this.groupServiceProvider.addMemberToGroup(Uid, this.joinedGroups).then(() => {
                this.authServiceProvider.userData = this.user;
                this.shareServiceProvider.hideLoading();
                //this.navCtrl.pop();
                this.shareServiceProvider.showToast("Register success")
                //this.navCtrl.push('RegisterSelectCategoriesPage')
                this.navCtrl.setRoot(TabsPage);
                this.navCtrl.popToRoot();
              });
            });
          } catch (error) {
            this.shareServiceProvider.hideLoading();
            this.shareServiceProvider.showAlert("Register Fail, Something went wrong!" + error);
          }
        })
          .catch(err => {
            this.shareServiceProvider.hideLoading();
            this.shareServiceProvider.showAlert("Register Fail, Something went wrong!" + err);
          });

      } else {
        this.shareServiceProvider.showAlert("Register Fail, password should longer than 8 length and contains number and letter !");
      }
    } else {
      this.shareServiceProvider.showAlert("Register Fail, please input the same password!");
    }
  }

}
