import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestoreModule, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as fs from 'firebase/firestore';
/*
  Generated class for the SponserServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SponserServiceProvider {

  constructor(
    public afd: AngularFireDatabase,
    public fireStore: AngularFirestore,
    public fireStorage: AngularFireStorage,
    ) {
    console.log('Hello SponserServiceProvider Provider');
  }

  async getSponser() {
    let sponserDoc = this.fireStore.firestore.collection(`Sponsers`);

    var sponserArray = await sponserDoc.get().then((querySnapshot) => {

      var sponsers = [];

      querySnapshot.forEach((doc) => {

        const data = doc.data();
        data.name = doc.id;
        sponsers.push(data);
      })
      return sponsers;
    })
    return sponserArray;
  }

  async claimSponser(uid: string, sponserID: string) {
    var sponserRef = this.fireStore.firestore.collection("Sponsers").doc(sponserID);

    await sponserRef.get().then((doc) => {
      if (doc.exists) {
        const data = doc.data();

        var array = data.claimedID;
        var quota = data.quota;

        array.push(uid);
        quota--;

        sponserRef.update({
          claimedID: array,
          quota: quota
        });

      }
    });
  }

}
