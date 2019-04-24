import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FoodCalorieCalculatorPage } from './food-calorie-calculator';

@NgModule({
  declarations: [
    FoodCalorieCalculatorPage,
  ],
  imports: [
    IonicPageModule.forChild(FoodCalorieCalculatorPage),
  ],
})
export class FoodCalorieCalculatorPageModule {}
