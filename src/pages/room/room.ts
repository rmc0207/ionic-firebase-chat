import { AuthProvider } from './../../providers/auth/auth';
import { FirebaseService } from './../../app/core/firebase.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AddRoomPage } from '../add-room/add-room';
import { HomePage } from '../home/home';
import * as firebase from 'firebase';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-room',
  templateUrl: 'room.html',
})
export class RoomPage {

  rooms = [];
  ref = firebase.database().ref('chatrooms/');

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private firebaseService: FirebaseService, public authProvider: AuthProvider) {
      console.log(authProvider.user);
    this.ref.on('value', resp => {
      this.rooms = [];
      this.rooms = firebaseService.snapshotToArray(resp);
    });
  }

  addRoom() {
    this.navCtrl.push(AddRoomPage);
  }

  joinRoom(key) {
    this.navCtrl.setRoot(HomePage, {
      key:key
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoomPage');
  }

  logout() {
    this.authProvider.logout();
    this.navCtrl.setRoot(LoginPage);
  }
  
  goToLogin() {
    this.navCtrl.push(LoginPage);
  }
}