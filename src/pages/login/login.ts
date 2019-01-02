import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ShareServiceProvider } from '../../providers/share-service/share-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { TabsPage } from '../tabs/tabs';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email: string
  password: string

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public shareServiceProvider: ShareServiceProvider,
    public authServiceProvider: AuthServiceProvider,
    public userServiceProvider: UserServiceProvider,
  ) {
    
    this.authServiceProvider.logout();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  createAccount() {
    console.log('Register Page');
    this.navCtrl.push('RegisterSelectCategoriesPage')
  }

  login() {
    this.authServiceProvider.login(this.email, this.password).then((currentUser)=>{
      console.log(this.authServiceProvider.isLoggedIn());
      console.log(this.authServiceProvider.userData);
      if (this.authServiceProvider.isLoggedIn()) {
        this.navCtrl.setRoot(TabsPage);
        this.navCtrl.popToRoot();
      }
      
    });
  }

  initLogin(){
    this.authServiceProvider.login("17200083@life.hkbu.edu.hk", "aaaa1111").then((currentUser)=>{
      console.log(this.authServiceProvider.isLoggedIn());
      console.log(this.authServiceProvider.userData);
      if (this.authServiceProvider.isLoggedIn()) {
        this.navCtrl.setRoot(TabsPage);
        this.navCtrl.popToRoot();
      }
    });
  }


}
