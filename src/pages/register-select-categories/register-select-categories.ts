import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GroupServiceProvider } from '../../providers/group-service/group-service';
/**
 * Generated class for the RegisterSelectCategoriesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register-select-categories',
  templateUrl: 'register-select-categories.html',
})
export class RegisterSelectCategoriesPage {
  categories: any[];
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public groupServiceProvider: GroupServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterSelectCategoriesPage');
    this.groupServiceProvider.getCategories().then((list)=>{
      this.categories = list;
    });
    
  }

}
