import { AuthProvider } from './../../providers/auth/auth';
import { User } from './../../shared/models/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser/src/dom/events/hammer_gestures';
import { RoomPage } from '../room/room';
import { validateArgCount } from '@firebase/util/dist/esm/src/validation';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  
  user = {} as User;
  notification: string;

  constructor(private afAuth: AngularFireAuth,
    public navCtrl: NavController, public navParams: NavParams, private authProvider: AuthProvider) {
  }
 

  ionViewWillEnter() {
    console.log(this.authProvider.user);
    this.authProvider.user.subscribe((data) => {
      if(data && data.email)
        this.navCtrl.setRoot(RoomPage);
    });
  }

  login(user: User) {
    this.authProvider.login(user.email, user.password).then((value) => {
      if(value)
      this.navCtrl.setRoot(RoomPage);
    }, err => {
      this.notification = err.message;
    });
  }
 
  async register(user: User) {
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(
        user.email,
        user.password
      );
      if (result) {
        this.navCtrl.setRoot(RoomPage);
      }
    } catch (e) {
      console.error(e);
    }
  }
}
