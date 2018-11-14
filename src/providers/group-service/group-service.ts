import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestoreModule, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';

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
    ) 
  {
    console.log('Hello GroupServiceProvider Provider');
  }

  async getCategories() {
    //This code can getting all doc data inside a collection
    
    let cateDoc = this.fireStore.firestore.collection(`Groups`);
    await cateDoc.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        //console.log(doc.id, "=>", doc.data());
        
        var cate = {
          name: doc.id,
          img: doc.data(),
        }
        this.categories.push(cate);
      })
    })
    return this.categories;
  }

  getGroups(){
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

  removeGroup(){

  }



  createGroup(image: string){
    const picture = this.fireStorage.ref('Groups/myphoto.jpg');
    picture.putString(image, 'data_url').then(function(snapshot) {
      
    });;
  }

}
