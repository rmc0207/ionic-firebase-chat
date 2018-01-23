import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'firebase';

import { SignInPage } from '../pages/sign-in/sign-in';

const config = {
  apiKey: "AIzaSyDo6hS5GM9oEkaplusf9ystgbP7kNzbgm8",
  authDomain: "ionic-chat-a0f95.firebaseapp.com",
  databaseURL: "https://ionic-chat-a0f95.firebaseio.com",
  projectId: "ionic-chat-a0f95",
  storageBucket: "ionic-chat-a0f95.appspot.com",
  messagingSenderId: "370215632811"
};

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = SignInPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    firebase.initializeApp(config);
  }
}

