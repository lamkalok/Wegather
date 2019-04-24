import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ShareServiceProvider } from '../../providers/share-service/share-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { UserServiceProvider } from '../../providers/user-service/user-service';

/**
 * Generated class for the UserUpdatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-update',
  templateUrl: 'user-update.html',
})
export class UserUpdatePage {

  name: string;
  phone: any;
  email: any;
  imgSrc: string;
  userData: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public camera: Camera,
    public shareServiceProvider: ShareServiceProvider,
    public authServiceProvider: AuthServiceProvider,
    public userServiceProvider: UserServiceProvider,
    public events: Events
    ) {
      this.userData = this.navParams.data;
      this.name = this.userData.name;
      this.phone = this.userData.phone;
      this.email = this.userData.email;
      this.imgSrc = this.userData.img;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserUpdatePage');
  }

  takeImage(){
    const options: CameraOptions = {
      quality: 65,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.imgSrc = base64Image;
      
    }, (err) => {
      // Handle error
    });
  }

  update() {
    this.shareServiceProvider.showLoading();
    var photoName = Date.now();
    this.userServiceProvider.uploadUserImage(this.imgSrc, photoName, this.authServiceProvider.getLoggedUID()).then(url => {
      url.subscribe(u => {
        this.userServiceProvider.updateUser(u, this.name, this.email, this.phone, this.authServiceProvider.getLoggedUID()).then(() => {
          this.shareServiceProvider.hideLoading();

          this.authServiceProvider.userData.img = u;
          this.authServiceProvider.userData.name = this.name;
          this.authServiceProvider.userData.email = this.email;
          this.authServiceProvider.userData.phone = this.phone;

          var user = {
            img: u,
            name: this.name,
            phone: this.phone,
            email: this.email
          }

          this.events.publish('user:updated', user);

          this.shareServiceProvider.showAlertWithTitle("Update successfully", "Great");



        })
      })
    })
  }

}
