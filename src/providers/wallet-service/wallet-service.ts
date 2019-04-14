import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the WalletServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WalletServiceProvider {

  constructor(
    public storage: Storage
    ) {
    console.log('Hello WalletServiceProvider Provider');
  }


  async checkLength(){
    
    var length = await this.storage.length();
    console.log("len", length);
    return length;
  }
  

}
