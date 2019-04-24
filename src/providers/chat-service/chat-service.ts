import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestoreModule, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

import * as fs from 'firebase/firestore';
import { Observable } from 'rxjs';
/*
  Generated class for the ChatServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChatServiceProvider {

  constructor(
    public afd: AngularFireDatabase,
    public fireStore: AngularFirestore,
    public fireStorage: AngularFireStorage,
    public authServiceProvider: AuthServiceProvider,
  ) {
    console.log('Hello ChatServiceProvider Provider');
  }

  async checkChatBefore(target_uid, uid) {
    var result = null;
    var userRef = this.fireStore.firestore.collection("Users").doc(uid);
    try {
      await userRef.get().then((doc) => {

        if (doc.data().chats == undefined) {
          console.log("isUndef");
          return result;

        } else {
          var chats = doc.data().chats;
          chats.forEach(element => {
            console.log(element);
            if (element.target_id == target_uid) {
              result = element.id;
            }
          });
        }
      })
      return result;

    } catch (error) {

    }
  }

  async checkChatBeforeRealTime(target_uid, uid) {
    return await this.fireStore.doc('Users/' + uid).snapshotChanges();
  }



  async createChat(target, user) {
    console.log(target);
    console.log(user);

    var doc_id = await this.fireStore.firestore.collection("Chats").add({
      chatUserInfo: [target, user],
      messages: []
    })
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
        return docRef.id;
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });

    return doc_id;


  }

  async setUserChats(chatID, target_id, uid) {
    var userRef = this.fireStore.firestore.collection("Users").doc(uid);

    // User side
    await userRef.get().then((doc) => {

      if (doc.data().chats == undefined) {
        console.log("user isUndef");
        userRef.set(
          { chats: [{ id: chatID, target_id: target_id }] },
          { merge: true }
        )

      } else {
        var chats = doc.data().chats;
        chats.push({ id: chatID, target_id: target_id });
        userRef.update({
          chats: chats
        })
      }
    })
      // target side
      .then(() => {
        var userRef = this.fireStore.firestore.collection("Users").doc(target_id);
        userRef.get().then((doc) => {

          if (doc.data().chats == undefined) {
            console.log("target isUndef");
            userRef.set(
              { chats: [{ id: chatID, target_id: uid }] },
              { merge: true }
            )

          } else {
            var chats = doc.data().chats;
            chats.push({ id: chatID, target_id: uid });
            userRef.update({
              chats: chats
            })
          }
        })

      });
  }

  async createMessage(target, user, chat_id, content) {
    var chatRef = this.fireStore.firestore.collection("Chats").doc(chat_id);
    await this.fireStore.firestore.collection("Messages").add({
      content: content,
      sender: user,
      receiver: target,
      timestamp: new Date()
    }).then(function (docRef) {
      console.log("Create message successfully: " + docRef.id);

      chatRef.get().then((doc) => {
        var messages = doc.data().messages;
        console.log(doc.data());

        messages.push(docRef.id);
        console.log(messages);
        chatRef.update({
          messages: messages
        })

      })

    })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });;;
  }

  async getChatMessages(chat_id) {
    // return await this.fireStore.firestore.collection("Chats").doc(chat_id).collection("Messages").doc()
    // .onSnapshot(function(querySnapshot) {
    //     console.log("Current data: ", querySnapshot.data());
    // });
    return this.fireStore.doc('Chats/' + chat_id).valueChanges();
    // obs.subscribe(evt => {
    //   console.log(evt);
    // });

  }


  async getChats(chat_id) {
    return await this.fireStore.doc('Chats/' + chat_id).snapshotChanges();
  }



  async getMessages(message_id) {
    var docData;
    var messageRef = this.fireStore.firestore.collection("Messages").doc(message_id);
    await messageRef.get().then((doc) => {
      //console.log(doc.data());
      docData = doc.data();
      docData.id = doc.id;
    });
    return docData;
  }



}
