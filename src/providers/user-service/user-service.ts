import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestoreModule, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { User } from "../../data/user.interface";

/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserServiceProvider {
  usersCollection: any;
  user:User;
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

  async getUser(uid: string){
    var uData: any;
    var userRef = this.fireStore.firestore.collection("Users").doc(uid);
    await userRef.get().then((doc)=>{
      const data = doc.data();
      var u = {
        email: doc.data().email,
        img: doc.data().img,
        joinedGroups: doc.data().joinedGroups,
        name: doc.data().name,
        phone: doc.data().phone
      }
      uData = u;
    });
    return uData;
  }

}
