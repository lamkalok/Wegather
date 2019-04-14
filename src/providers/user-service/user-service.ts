import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestoreModule, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { User } from "../../data/user.interface";
import { AuthServiceProvider } from '../auth-service/auth-service';


/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserServiceProvider {
  usersCollection: any;
  user: User;
  constructor(
    public afd: AngularFireDatabase,
    public fireStore: AngularFirestore,
    public fireStorage: AngularFireStorage,
  ) {
    console.log('Hello UserServiceProvider Provider');

  }

  async createUser(user: User, uid: string) {

    this.user = user;

    this.fireStore.collection('Users').doc(uid).set({
      img: user.img,
      name: user.name,
      email: user.email,
      phone: user.phone,
      joinedGroups: user.joinedGroups
    })
      .then(function () {
        console.log("User successfully Created");
      })
      .catch(function (error) {
        console.error("Error create user: ", error);
      });
  }

  async getUser(uid: string) {
    var uData: any;
    var userRef = this.fireStore.firestore.collection("Users").doc(uid);
    await userRef.get().then((doc) => {
      const data = doc.data();
      var chats = [];
      if(doc.data().chats != undefined){
        chats = doc.data().chats
      }
      var u = {
        uid: doc.id,
        email: doc.data().email,
        img: doc.data().img,
        joinedGroups: doc.data().joinedGroups,
        name: doc.data().name,
        phone: doc.data().phone,
        chats: chats
      }
      uData = u;
    });
    return uData;
  }

  async getUserRealTime(uid){
    return await this.fireStore.doc('Users/' + uid).snapshotChanges();
  }

  async getUserJoinedGroupRealTime(uid){
    return await this.fireStore.doc('Users/' + uid ).snapshotChanges()
  }

  async addGroupToUser(uid: string, joinedGroups: Array<any>, auth: AuthServiceProvider) {  
      var userRef = this.fireStore.firestore.collection("Users").doc(uid);
      userRef.get().then((doc) => {
        const data = doc.data();
        var array = data.joinedGroups;
        var processed = 0;
        joinedGroups.forEach(groupID => {
          auth.userData.joinedGroups.push(groupID);
          array.push(groupID);
          processed++;
          if(processed==joinedGroups.length){
            userRef.update({
              joinedGroups: array,
            })
            
          }
        });
      })
  }

  async removeGroupFromUser(uid: string, groupID, auth: AuthServiceProvider){
    var userRef = this.fireStore.firestore.collection("Users").doc(uid);
    userRef.get().then((doc) => {
      const data = doc.data();
      var array = data.joinedGroups;
      var position = array.indexOf(groupID);

      var positionInAuthUserData = auth.userData.joinedGroups.indexOf(groupID);
      if ( ~positionInAuthUserData ) auth.userData.joinedGroups.splice(positionInAuthUserData, 1);

        if ( ~position ) array.splice(position, 1);
        userRef.update({
          joinedGroups: array,
        });
      
    })
  }

}
