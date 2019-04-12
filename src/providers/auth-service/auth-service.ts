
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { User } from "../../data/user.interface";
import { AngularFireAuth } from 'angularfire2/auth';
import { ShareServiceProvider } from '../../providers/share-service/share-service';
import { UserServiceProvider } from '../../providers/user-service/user-service';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

  userData: any;

  constructor(
    public firebaseAuth: AngularFireAuth,
    public shareServiceProvider: ShareServiceProvider,
    public userServiceProvider: UserServiceProvider, ) {
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

  async login(email: string, password: string) {
    await this.firebaseAuth.auth.signInWithEmailAndPassword(email, password).then(value => {
      console.log('Nice, it worked!');
    })
      .catch(err => {
        console.log('Something went wrong:', err.code);
        switch (err.code) {
          case "auth/invalid-email":
            this.shareServiceProvider.showAlert(err.message);
            break;
          case "auth/user-not-found":
            this.shareServiceProvider.showAlert("user not find");
            break;
          case "auth/wrong-password":
            this.shareServiceProvider.showAlert("worng password");
            break;
          default:
            this.shareServiceProvider.showAlert(err.message);
            break;
        }
      });
    try {
      if(this.firebaseAuth.auth.currentUser!=null){
        await this.userServiceProvider.getUser(this.firebaseAuth.auth.currentUser.uid).then((u) => {
          console.log(u);
          this.userData = u
        });
      }
    } catch (error) {
      console.log(error);
    }
    return this.firebaseAuth.auth.currentUser;
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
