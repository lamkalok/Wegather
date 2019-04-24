import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FoodCalorieCalculatorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-food-calorie-calculator',
  templateUrl: 'food-calorie-calculator.html',
})
export class FoodCalorieCalculatorPage {

  plugin: any;
  food: string;
  size: number;
  unit: string = "g"
  result: number;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams) {
      
      this.plugin = this.navParams.data;
      console.log(this.plugin);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FoodCalorieCalculatorPage');
  }

  getResult(){
    console.log(this.unit);
    const letters = (this.food + this.unit).toLowerCase();
    let sum = 0;
    for(let i = 0 ; i < letters.length; i++){
      sum += letters.charCodeAt(i);
    }
    this.result = sum /  this.size * 10;
  }

}
