import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestoreModule, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import * as fs from 'firebase/firestore';

/*
  Generated class for the GroupServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GroupServiceProvider {

  categories = [];

  constructor(
    public afd: AngularFireDatabase,
    public fireStore: AngularFirestore,
    public fireStorage: AngularFireStorage,
  ) {
    console.log('Hello GroupServiceProvider Provider');
  }

  async getCategories() {
    //This code can getting all doc data inside a collection
    console.log("GroupServiceProvider getCategories")
    this.categories = [];
    let cateDoc = this.fireStore.firestore.collection(`Categories`);

    await cateDoc.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {

        const data = doc.data();

        var cate = {
          name: doc.id,
          img: data.img,
          selected: false,
          groups: data.groups,
        }
        this.categories.push(cate);
      })
    })
    return this.categories;
  }

  async getUserJoindedGroups(joinedGroups) {
    var groupData = [];
    await this.fireStore.firestore.collection("Groups").get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        joinedGroups.forEach((element) => {
          if (element == doc.id) {
            var g = {
              id: doc.id,
              img: doc.data().img,
              numberOfMembers: doc.data().numberOfMembers,
              owner: doc.data().owner,
              members: doc.data().members
            }
            groupData.push(g)
          }
        })
      });
    });
    return groupData;
  }

  getAllGroups() {
    //return this.afd.list('/Groups').valueChanges();
    return this.fireStore.collection('Groups').valueChanges();
  }
  /*
  addGroup(group):boolean{
    this.afd.list('./groups').push(group).then(res => {
      console.log(res);
    });
      return true;
  }*/

  async getGroup(cateName: string, group: string) {

    // let groupDoc = this.fireStore.firestore.collection(`Groups`).get();

    // groupDoc.then((querySnapshot)=>{
    //   querySnapshot.forEach((doc) => {

    //     const data = doc.data();
    //     console.log(doc.id);
    //   })
    // });
    var retrunGroup = null;
    var docRef = this.fireStore.firestore.collection("Groups").doc(group);

    await docRef.get().then(function (doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data());

        const data = doc.data();

        var group = {
          id: doc.id,
          img: data.img,
          numberOfMembers: data.numberOfMembers,
          joined: false
        }

        //console.log("group: " + group);

        retrunGroup = group;
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });

    return retrunGroup;
  }

  removeGroup() {

  }



  createGroup(image: string) {
    const picture = this.fireStorage.ref('Groups/myphoto.jpg');
    picture.putString(image, 'data_url').then(function (snapshot) {
    });;
  }

  async addMemberToGroup(user, joinedGroups) {
    await joinedGroups.forEach(id => {
      var groupRef = this.fireStore.firestore.collection("Groups").doc(id);

      groupRef.get().then(function (doc) {
        if (doc.exists) {
          console.log("Document data:", doc.data());

          const data = doc.data();

          var count = data.numberOfMembers + 1;
          //console.log("group: " + group);

          var array = data.members;

          array.push(user.uid);

          groupRef.update({
            members: array,
            numberOfMembers: count
          });

        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      }).catch(function (error) {
        console.log("Error getting document:", error);
      });
    });
  }

}
