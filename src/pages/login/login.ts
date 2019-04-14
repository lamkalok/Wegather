import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ShareServiceProvider } from '../../providers/share-service/share-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { TabsPage } from '../tabs/tabs';

import { Http, Headers, RequestOptions } from '@angular/http';

import { HTTP } from '@ionic-native/http';

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
    public http: Http,
    private http_ionic_native: HTTP
  ) {
    this.authServiceProvider.logout();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  createAccount() {
    this.navCtrl.push('RegisterSelectCategoriesPage')
  }

  login() {
    if (this.email == null || this.password == null) {
      this.shareServiceProvider.showAlert("Please enter email and password");
    } else {
      this.authServiceProvider.login(this.email, this.password).then((currentUser) => {
        console.log(this.authServiceProvider.isLoggedIn());
        console.log(this.authServiceProvider.userData);
        if (this.authServiceProvider.isLoggedIn()) {
          this.navCtrl.setRoot(TabsPage);
          this.navCtrl.popToRoot();
        }
      });
    }

  }

  // Fast login function for debugging
  initLogin() {

    // this.shareServiceProvider.showToast("Click");

    // Android and web http
    // let headers = new Headers(
    //   {
    //     'Content-Type' : 'application/json'
    //   });

    //   let options = new RequestOptions({ headers: headers });
    //   var data = {
    //     'address': "0xc12A83339750bE19CA5158Ab03E827b43c9847af"
    //   }
    // this.http.post('https://wegathertoken.herokuapp.com/checkBalance', data).toPromise()
    //   .then(res => {
    //     console.log(res.json());
    //     this.shareServiceProvider.showConfirm(res.json().balance, "Your token balance!");
    //   }).catch(error => {
    //     console.log(error);
    //     this.shareServiceProvider.showConfirm("!!!!Error" + error , error.status);
    //   });


    // IOS HTTP
    // let headers = new Headers(
    //   {
    //     'Content-Type' : 'application/json'
    //   });

    //   let options = new RequestOptions({ headers: headers });
    //   var data = {
    //     'address': "0xc12A83339750bE19CA5158Ab03E827b43c9847af"
    //   }
    // this.http_ionic_native.post('https://wegathertoken.herokuapp.com/checkBalance', data, { Authorization: 'OAuth2: token' })
    //   .then(res => {
    //     console.log(res.status);
    //     console.log(res.data); // data received by server
    //     console.log(res.headers);
    //     // console.log(res.json());
    //     this.shareServiceProvider.showConfirm(res.data, "Your token balance!");
    //   }).catch(error => {
    //     console.log(error);
    //     this.shareServiceProvider.showConfirm("!!!!Error" + error , error.status);
    //   });


    // var http = new XMLHttpRequest();
    // var url = 'https://wegathertoken.herokuapp.com/checkBalance';
    // // var url = 'http://192.168.0.104:5000/checkBalance';
    // var data = {
    //   'address': "0xc12A83339750bE19CA5158Ab03E827b43c9847af"
    // }
    // http.open('POST', url, true);

    // //Send the proper header information along with the request
    // http.setRequestHeader('Content-type', 'application/json');
    // var share = this.shareServiceProvider;
    // http.onreadystatechange = function () {//Call a function when the state changes.
    //   if (http.readyState == 4 && http.status == 200) {
    //     //alert(http.responseText);
    //     share.showConfirm(http.responseText, "OKOK");
    //   } else {
    //     alert(http.responseText);
    //   }
    // }
    // http.send(JSON.stringify(data));



    this.authServiceProvider.login("17200083@life.hkbu.edu.hk", "aaaa1111").then((currentUser) => {
      if (this.authServiceProvider.isLoggedIn()) {
        this.navCtrl.setRoot(TabsPage);
        this.navCtrl.popToRoot();
      }
    });
  }


}
