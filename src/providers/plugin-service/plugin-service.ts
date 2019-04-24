import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestoreModule, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as fs from 'firebase/firestore';

/*
  Generated class for the PluginServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PluginServiceProvider {
  obs: Observable<any>;
  constructor(
    public afd: AngularFireDatabase,
    public fireStore: AngularFirestore,
    public fireStorage: AngularFireStorage,
    ) {
    console.log('Hello PluginServiceProvider Provider');
  }

  async getPlugins() {
    let plugInDoc = this.fireStore.firestore.collection(`Plugins`);

    var plugInArray = await plugInDoc.get().then((querySnapshot) => {

      var plugIns = [];

      querySnapshot.forEach((doc) => {

        const data = doc.data();

        console.log("plugin data", doc.data());
        
        var plug = {
          name: doc.id,
          img: data.img,
          desc: data.desc,
          pageUrl: data.pageUrl,
          purchasedGroups: data.purchasedGroups,
          cost: data.cost
        }
        plugIns.push(plug);
      })
      return plugIns;
    })
    return plugInArray;
  }

  async buyPlugin(groupID: string, pluginID: string) {
    var plugInRef = this.fireStore.firestore.collection("Plugins").doc(pluginID);

    await plugInRef.get().then((doc) => {
      if (doc.exists) {
        const data = doc.data();

        var array = data.purchasedGroups;

        array.push(groupID);

        plugInRef.update({
          purchasedGroups: array,
        });

      }
    });
  }

}
