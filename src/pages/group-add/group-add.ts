import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { GroupServiceProvider } from '../../providers/group-service/group-service';
/**
 * Generated class for the GroupAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-group-add',
  templateUrl: 'group-add.html',
})
export class GroupAddPage {
  imgSrc: string;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public camera: Camera,
    public groupService: GroupServiceProvider,
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupAddPage');
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

  selectTags(){
    console.log("tags");
    this.navCtrl.pop();
  }

  createGroup(){
    this.groupService.createGroup(this.imgSrc)
  }

}
