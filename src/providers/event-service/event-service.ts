import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestoreModule, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

import * as fs from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
/*
  Generated class for the EventServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EventServiceProvider {
  obs: Observable<any>;
  constructor(
    public afd: AngularFireDatabase,
    public fireStore: AngularFirestore,
    public fireStorage: AngularFireStorage,
    public authServiceProvider: AuthServiceProvider,
  ) {
    console.log('Hello EventServiceProvider Provider');
  }

  async uploadEventImage(imagesString, eventName, uid) {
    // var downloadURL = "";
    // var imageName = Date.now() + eventName;
    let storageRef = this.fireStorage.ref('Events/' + uid + eventName);
    await storageRef.putString(imagesString, 'data_url');
    const ref = this.fireStorage.ref('Events/' + uid + eventName);
    return ref.getDownloadURL();
  }

  async downloadingFiles(eventName, uid) {
    const ref = this.fireStorage.ref('Events/' + uid + eventName);
    return ref.getDownloadURL();
  }

  async createEvent(event, uid, groupID) {
    await this.fireStore.collection('Events').doc(event.name).set({
      attendedMembers: [uid],
      comments: [],
      date_from: new Date(event.dateStarts),
      date_to: new Date(event.dateEnd),
      description: event.description,
      groupID: groupID,
      img: event.img,
      location: event.location,
      organizerID: uid,
      photos: []
    })
      .then(function () {
        console.log("Event successfully Created");
      })
      .catch(function (error) {
        console.error("Error create event: ", error);
      });
  }

  async createEventSnapShot(event, uid, groupID) {
    var ess = {
      date_from: new Date(event.dateStarts),
      date_to: new Date(event.dateEnd),
      description: event.description,
      id: event.name,
      img: event.img
    }
    var groupRef = this.fireStore.firestore.collection("Groups").doc(groupID);
    await groupRef.get().then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        console.log(data);
        console.log(ess);
        var eventsSnapshot = data.eventsSnapshot;
        eventsSnapshot.push(ess);
        groupRef.update({
          eventsSnapshot: eventsSnapshot
        });
      }
    })

  }

  async getEvent(eventID) {

    console.log(eventID);

    this.obs = this.fireStore.doc('Events/' + eventID).valueChanges();
    this.obs.subscribe(evt => {
      console.log(evt);
    });

    return this.obs;
    //Get all data in collection
    // this.fireStore.collection('/Events').valueChanges().subscribe(v=>{
    //   console.log(v);
    // });
  }

  async addMemeberToEvent(user, joinEvent) {
    var eventRef = this.fireStore.firestore.collection("Events").doc(joinEvent);

    await eventRef.get().then((doc) => {
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

  async removeMemberFromEvent(userID, joinedEvent) {
    var eventRef = this.fireStore.firestore.collection("Events").doc(joinedEvent);

    await eventRef.get().then((doc) => {
      if (doc.exists) {
        const data = doc.data();

        var array = data.attendedMembers;

        var position = array.indexOf(userID);

        if (~position) array.splice(position, 1);

        eventRef.update({
          attendedMembers: array,
        });
      }
    });
  }

  async takeAttendance(userID, joinedEvent) {
    var eventRef = this.fireStore.firestore.collection("Events").doc(joinedEvent);
    var message = await eventRef.get().then((doc) => {
      var attendedMembers = doc.data().attendedMembers;
      var attendedRecord = doc.data().attendedRecord;
      var msg;
      if (!doc.data().attendedRecord) {
        console.log("attendedRecord isUndef");
        eventRef.set(
          { attendedRecord: [userID] },
          { merge: true }
        )
        if (!attendedMembers.includes(userID)) {
          attendedMembers.push(userID);
          eventRef.update({
            attendedMembers: attendedMembers
          })
        }
        msg = {
          message: "Adding Attendance record successfully",
          title: "Great"
        }
        return msg;
      } else {
        if (!attendedRecord.includes(userID)) {
          attendedRecord.push(userID);
          if (!attendedMembers.includes(userID)) {
            attendedMembers.push(userID);
          }
          eventRef.update({
            attendedRecord: attendedRecord,
            attendedMembers: attendedMembers
          })
          msg = {
            message: "Adding Attendance record successfully",
            title: "Great"
          }
          return msg;
        } else {
          msg = {
            message: "The record have been added",
            title: "Error"
          }
          return msg;
        }
      }
    })
    return message;
  }

  async getAttendanceRecord(eventID) {
    var eventRef = this.fireStore.firestore.collection("Events").doc(eventID);
    var attendedRecord = await eventRef.get().then(doc => {
      return doc.data().attendedRecord;
    })
    return attendedRecord;
  }

}
