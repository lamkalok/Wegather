import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { MessagesPage } from '../pages/messages/messages';
import { ContactPage } from '../pages/contact/contact';
import { LoginPage } from '../pages/login/login';
import { UserPage } from '../pages/user/user';
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
import { EventServiceProvider } from '../providers/event-service/event-service';
import { ChatServiceProvider } from '../providers/chat-service/chat-service';
import { EthereumProvider } from '../providers/ethereum/ethereum';
import { HTTP } from '@ionic-native/http';

import { IonicStorageModule } from '@ionic/storage';
import { WalletPage } from '../pages/wallet/wallet';
import { WalletServiceProvider } from '../providers/wallet-service/wallet-service';

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
    MessagesPage,
    ContactPage,
    LoginPage,
    UserPage,
    TabsPage,
    WalletPage
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
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    HomePage,
    ContactPage,
    MessagesPage,
    LoginPage,
    UserPage,
    TabsPage,
    WalletPage
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
    EventServiceProvider,
    ChatServiceProvider,
    EthereumProvider,
    IonicStorageModule,
    HTTP,
    WalletServiceProvider
  ]
})
export class AppModule {}
