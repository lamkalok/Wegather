import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { LoginPage } from '../pages/login/login';

import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth'
import { AngularFireStorageModule } from '@angular/fire/storage';
import { GroupServiceProvider } from '../providers/group-service/group-service';
import { AngularFirestoreModule, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Camera } from '@ionic-native/camera';
import { ShareServiceProvider } from '../providers/share-service/share-service';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { UserServiceProvider } from '../providers/user-service/user-service';

// Initialize Firebase
var firebaseConfig = {
  apiKey: "AIzaSyAECqVG3OgN2RkGG2xgYt8grTgj5kQ4VSs",
  authDomain: "wegather-dcb52.firebaseapp.com",
  databaseURL: "https://wegather-dcb52.firebaseio.com",
  projectId: "wegather-dcb52",
  storageBucket: "wegather-dcb52.appspot.com",
  messagingSenderId: "95186879284"
};


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    HomePage,
    ContactPage,
    LoginPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFireModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(firebaseConfig),
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    HomePage,
    ContactPage,
    LoginPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    GroupServiceProvider,
    AngularFirestoreModule,
    Camera,
    ShareServiceProvider,
    AuthServiceProvider,
    UserServiceProvider,
  ]
})
export class AppModule {}
