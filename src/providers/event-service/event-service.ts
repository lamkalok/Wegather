import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestoreModule, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

import * as fs from 'firebase/firestore';
import { Observable } from 'rxjs';
/*
  Generated class for the EventServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EventServiceProvider {
  obs:Observable<any>;
  constructor(
    public afd: AngularFireDatabase,
    public fireStore: AngularFirestore,
    public fireStorage: AngularFireStorage,
    public authServiceProvider: AuthServiceProvider,
    ) {
    console.log('Hello EventServiceProvider Provider');
  }

  async getEvent(eventID){

    console.log(eventID);

    this.obs = this.fireStore.doc('Events/' + eventID ).valueChanges();
    this.obs.subscribe(evt => {
      console.log(evt);
    });

    return this.obs;
    //Get all data in collection
    // this.fireStore.collection('/Events').valueChanges().subscribe(v=>{
    //   console.log(v);
    // });
  }

  async addMemeberToEvent(user, joinEvent){
    var eventRef = this.fireStore.firestore.collection("Events").doc(joinEvent);

    await eventRef.get().then((doc)=>{
      if (doc.exists) {
        const data = doc.data();

        var array = data.attendedMembers;

        array.push(user);

        eventRef.update({
          attendedMembers: array,
        });

      }
    });
  }

  async removeMemberFromEvent(userID, joinedEvent){
    var eventRef = this.fireStore.firestore.collection("Events").doc(joinedEvent);

    await eventRef.get().then((doc)=>{
      if (doc.exists) {
        const data = doc.data();

        var array = data.attendedMembers;

        var position = array.indexOf(userID);

        if ( ~position ) array.splice(position, 1);

        eventRef.update({
          attendedMembers: array,
        });
      }
    });
  }

}
