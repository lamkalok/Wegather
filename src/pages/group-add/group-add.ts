import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ShareServiceProvider } from '../../providers/share-service/share-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { GroupServiceProvider } from '../../providers/group-service/group-service';
import { EventServiceProvider } from '../../providers/event-service/event-service';

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
  categories: any;
  selectedCate: any;
  groupName: string;
  groupDesc: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public camera: Camera,
    public groupService: GroupServiceProvider,
    public shareServiceProvider: ShareServiceProvider,
    public authServiceProvider: AuthServiceProvider,
    public userServiceProvider: UserServiceProvider,
    public eventServiceProvider: EventServiceProvider,
    ) {
      this.groupService.getCategories().then(cate => {
        console.log(cate);
        this.categories = cate;
      })
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

  async createGroup(){
    this.shareServiceProvider.showLoading();
    console.log(this.selectedCate);
    var uid = await this.authServiceProvider.getLoggedUID();
    this.groupService.uploadGroupImage(this.imgSrc, this.groupName, uid).then(url => {
      url.subscribe(u => {
        this.groupService.createGroup(u, this.groupName, this.groupDesc, uid).then(() => {
          this.groupService.addGroupToCategories(this.selectedCate.name, this.groupName).then(() => {
            this.groupService.addGroupToUser(this.groupName, uid).then(() => {
              this.authServiceProvider.userData.joinedGroups.push(this.groupName);
              this.shareServiceProvider.hideLoading();
              this.shareServiceProvider.showAlertWithTitle("Create Group Successfully", "Great");
              this.navCtrl.popTo(this.navCtrl.first());
            })
          })
        })
      })
      
    })
    // this.groupService.createGroup(this.imgSrc)
  }

}
