import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestoreModule, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Observable } from 'rxjs';
import * as fs from 'firebase/firestore';

/*
  Generated class for the GroupServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GroupServiceProvider {
  userJoinedGroup:Observable<any>;
  groupObserver:Observable<any>;
  categories = [];

  constructor(
    public afd: AngularFireDatabase,
    public fireStore: AngularFirestore,
    public fireStorage: AngularFireStorage,
    public authServiceProvider: AuthServiceProvider,
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

  async getUserJoinedGroupsRealTime(groupID){
    
    // var uid = this.authServiceProvider.getLoggedUID();
    // this.userJoinedGroup = this.fireStore.doc('Users/' + uid ).valueChanges();
    // await this.userJoinedGroup.subscribe(evt => {
    //   console.log(evt.joinedGroups);
    //   evt.joinedGroups.forEach(groupID => {
    //     this.groupObserver = this.fireStore.doc('Groups/' + groupID ).snapshotChanges();
    //     this.groupObserver.subscribe(groupEvt=>{
    //       console.log(groupEvt.payload.data());
    //       console.log(groupEvt.payload.id);
          
    //     })
    //   });
    // });

    // this.groupObserver = this.fireStore.doc('Groups/' + "新手媽媽谷" ).snapshotChanges();
    
    // return this.groupObserver;

    return await this.fireStore.doc('Groups/' + groupID ).snapshotChanges();

  }


  async getUserJoindedGroups(joinedGroups) {
    var groupData = [];
    await this.fireStore.firestore.collection("Groups").get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        //console.log(doc.id, " => ", doc.data());
        joinedGroups.forEach((element) => {
          if (element == doc.id) {

            
            try {
              // async () => {
              //   await doc.data().eventsSnapshot.forEach(element => {
              //     element.date = element.date.toDate();
              //     //console.log(element.date);
              //     return element;
              //   });

            } catch (error) {
              
            }
            var g = {
              id: doc.id,
              img: doc.data().img,
              numberOfMembers: doc.data().members.length,
              owner: doc.data().owner,
              members: doc.data().members,
              isPublic: doc.data().isPublic,
              shortDescription: doc.data().shortDescription,
              organizers: doc.data().organizers,
              eventsSnapshot: doc.data().eventsSnapshot,
            }
            
            groupData.push(g)
          }
        })
      });
    });
    await groupData.forEach((group)=>{
      try {
        group.eventsSnapshot.forEach(element => {
          element.date_from = element.date_from.toDate();
          
          //console.log(element.date_from);
        });
      } catch (error) {
        
      }
      
    })
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
    var auth = this.authServiceProvider;
    await docRef.get().then(function (doc) {
      if (doc.exists) {
        //console.log("Document data:", doc.data());

        const data = doc.data();

        var group = null;

        group = {
          id: doc.id,
          img: data.img,
          numberOfMembers: data.members.length,
          shortDescription: data.shortDescription,
          joined: false
        }    

        // logined user get new group 
        if(auth.isLoggedIn()){
          if(!data.members.includes(auth.getLoggedUID())){
            retrunGroup = group;
          } else {
            retrunGroup = null;
          }
        } else { // register user 
          retrunGroup = group;
        }
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

  // sleep time expects milliseconds
  sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}



  createGroup(image: string) {
    const picture = this.fireStorage.ref('Groups/myphoto.jpg');
    picture.putString(image, 'data_url').then(function (snapshot) {
    });;
  }

  async addMemberToGroup(uid, joinedGroups:Array<any>) {
    await joinedGroups.forEach(id => {
      var userRef = this.fireStore.firestore.collection("Users").doc(uid);
      var groupRef = this.fireStore.firestore.collection("Groups").doc(id);

      groupRef.get().then(function (doc) {
        if (doc.exists) {
          console.log("Document data:", doc.data());

          const data = doc.data();

          
          //console.log("group: " + group);

          var array = data.members;

          array.push(uid);

          groupRef.update({
            members: array,
          })

        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      }).catch(function (error) {
        console.log("Error getting document:", error);
      });
    });
  }

  
  async removeMebmerFromGroup(uid:string, groupID: string){
    var groupRef = this.fireStore.firestore.collection("Groups").doc(groupID);
    await groupRef.get().then((doc)=>{
      if (doc.exists) {
        const data = doc.data();

        var array = data.members;

        var position = array.indexOf(uid);

        if ( ~position ) array.splice(position, 1);

        groupRef.update({
          members: array,
        });
      }
    });
  }

}
