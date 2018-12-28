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
  count: number = 0;
  isValid: boolean = false;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public groupServiceProvider: GroupServiceProvider) {
  }

  ionViewDidLoad() {
    this.categories = [];
    this.count = 0;
    this.isValid = false;
    console.log('ionViewDidLoad RegisterSelectCategoriesPage');
    this.groupServiceProvider.getCategories().then((list)=>{
      this.categories = list;
    });
  }

  ionViewWillLeave(){

    console.log('ionViewWillLeave RegisterSelectCategoriesPage');

  }

  changeClass (cate) {
    if(cate.selected){
      this.count--;
    }else{
      this.count++;
    }
    cate.selected = !cate.selected;
    if(this.count > 0){
      this.isValid = true;
    }else{
      this.isValid = false;
    }
  }

  nextPage(){
    this.navCtrl.push('RegisterSelectGroupsPage', this.categories);
  }



}
