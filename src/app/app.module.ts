import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { MessagesPage } from '../pages/messages/messages';
import { LoginPage } from '../pages/login/login';
import { UserPage } from '../pages/user/user';
import { UserPageModule } from '../pages/user/user.module';
import { SponserPage } from '../pages/sponser/sponser';

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
import { WalletServiceProvider } from '../providers/wallet-service/wallet-service';
import { PluginServiceProvider } from '../providers/plugin-service/plugin-service';
import { EthereumProvider } from '../providers/ethereum/ethereum';
import { HTTP } from '@ionic-native/http';

import { QRCodeModule } from 'angularx-qrcode';
import { IonicStorageModule } from '@ionic/storage';
import { SponserServiceProvider } from '../providers/sponser-service/sponser-service';
// import { WalletPage } from '../pages/wallet/wallet';





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
    HomePage,
    MessagesPage,
    SponserPage,
    LoginPage,
    TabsPage,
    // UserPage
    // WalletPage
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
    IonicStorageModule.forRoot(),
    QRCodeModule,
    UserPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SponserPage,
    MessagesPage,
    LoginPage,
    UserPage,
    TabsPage,
    // WalletPage
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
    WalletServiceProvider,
    QRCodeModule,
    PluginServiceProvider,
    SponserServiceProvider,
  ]
})
export class AppModule {}
