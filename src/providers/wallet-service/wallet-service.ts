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
    return length;
  }
  
  async getWallet(){
    var wallet = await this.storage.get('wallet');
    return wallet;
  }

  async storeAccount(address, keystone){
    await this.getWallet().then(w => {
      if(w == null){
        var wallet = [{
            address: address,
            keystone: keystone
          }]
        // set a key/value
        this.storage.set('wallet', wallet);
        
      }else{
        console.log("w", w);
        w.push({
          address: address,
          keystone: keystone
        });
        // set a key/value
        this.storage.set('wallet', w);
      }
    })
    return "success";
  }

}
