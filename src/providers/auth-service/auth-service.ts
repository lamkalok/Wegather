
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { User } from "../../data/user.interface";
import { AngularFireAuth } from 'angularfire2/auth';


/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

  constructor(
    public firebaseAuth: AngularFireAuth) {
    console.log('Hello AuthServiceProvider Provider');
  }

  signup(email: string, password: string) {
    return this.firebaseAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  sendEmailVerification() {
    this.firebaseAuth.authState.subscribe(user => {
      user.sendEmailVerification()
        .then(() => {
          console.log('email sent');
          this.logout();
        })
    });
  }


  login(email: string, password: string) {
    return this.firebaseAuth.auth.signInWithEmailAndPassword(email, password)
  }

  logout() {
    this.firebaseAuth.auth.signOut();
  }

  isLoggedIn() {
    if (this.firebaseAuth.auth.currentUser != null) {
      return true;
    } else {
      return false;;
    }
  }

  getLoggedUID(): string {
    return this.firebaseAuth.auth.currentUser.uid;
  }



  getVerifyState(): boolean {
    return this.firebaseAuth.auth.currentUser.emailVerified;
  }


  recover(email): void {
    this.firebaseAuth.auth.sendPasswordResetEmail(email);
  }

  currentUserInfo() {
    console.log(this.firebaseAuth.auth.currentUser);
  }

}
