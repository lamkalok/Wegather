import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ShareServiceProvider } from '../../providers/share-service/share-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { GroupServiceProvider } from '../../providers/group-service/group-service';
import { User } from "../../data/user.interface";
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

  email : string; 
  password : string; 
  password2 : string;
  name: string;
  phone: string;
  user: User;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public shareServiceProvider: ShareServiceProvider,
    public authServiceProvider: AuthServiceProvider,
    public userServiceProvider: UserServiceProvider,
    public groupServiceProvider: GroupServiceProvider
    ) {
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  
  }

  register(){
    this.shareServiceProvider.showLoading();
    if(this.password == this.password2){

      this.user = {
        img: "",
        name: this.name,
        email: this.email,
        phone: this.phone,
      }
      console.log(this.user);
      this.authServiceProvider.signup(this.email,this.password).then(value => {
        var uid = this.authServiceProvider.getLoggedUID();
        console.log("UID: " + uid);
        this.userServiceProvider.createUser(this.user, uid).then(()=>{
          this.shareServiceProvider.hideLoading();
          this.navCtrl.pop();
          this.shareServiceProvider.showToast("Register success")
          //this.navCtrl.push('RegisterSelectCategoriesPage')
        });
      })
      .catch(err => {
        this.shareServiceProvider.hideLoading();
        this.shareServiceProvider.showAlert("Register Fail, Something went wrong!");
      });
  
    }else {
      this.shareServiceProvider.showAlert("Register Fail, please input the same password!");
    }
  }

}
