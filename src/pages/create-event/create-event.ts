import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ShareServiceProvider } from '../../providers/share-service/share-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { GroupServiceProvider } from '../../providers/group-service/group-service';
import { EventServiceProvider } from '../../providers/event-service/event-service';

/**
 * Generated class for the CreateEventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-event',
  templateUrl: 'create-event.html',
})
export class CreateEventPage {

  imgSrc: string;

  groupID: string;

  today = new Date(Date.now()).toISOString();

  event = {
    //dateStarts: new Date(Date.now()).toISOString(),
    name: "",
    location: "",
    description: "",
    dateStarts:undefined,
    dateEnd: "",
    img: ""
  }

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public camera: Camera,
    public shareServiceProvider: ShareServiceProvider,
    public authServiceProvider: AuthServiceProvider,
    public userServiceProvider: UserServiceProvider,
    public groupServiceProvider: GroupServiceProvider,
    public eventServiceProvider: EventServiceProvider,
    ) {
    
    this.groupID = this.navParams.data;
    console.log(this.groupID);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateEventPage');
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

  createEvent(){
    
    
    try {
      this.shareServiceProvider.showLoading();
      console.log(this.event);
      this.eventServiceProvider.uploadEventImage(this.imgSrc, this.event.name, this.authServiceProvider.getLoggedUID()).then((url)=>{
        
        url.subscribe(u=>{
          
          this.event.img = u;
          this.eventServiceProvider.createEvent(this.event, this.authServiceProvider.getLoggedUID(), this.groupID).then(()=>{
            this.shareServiceProvider.hideLoading();
            this.shareServiceProvider.showToast("Event create successfully");
            this.navCtrl.pop();
          });
        })
      });
    } catch (error) {
      
    }

  }

}
