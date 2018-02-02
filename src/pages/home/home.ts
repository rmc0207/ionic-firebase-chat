import { FirebaseService } from './../../app/core/firebase.service';
import { ChatService } from './../../app/core/chat.service';
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
import { RoomPage } from '../room/room';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild(Content) content: Content;
  
  data = { type:'', nickname:'', message:'' };
  chats = [];
  roomkey:string;
  nickname:string;
  offStatus:boolean = false;
  roomRef: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private chatService: ChatService, private firebaseService: FirebaseService) {

    this.roomkey = this.navParams.get("key") as string;
    this.nickname = this.navParams.get("nickname") as string;
    this.data.type = 'message';
    this.data.nickname = 'Gary';

    chatService.roomRef = 'chatrooms/'+this.roomkey+'/chats';
    chatService.sendMessage('join', this.data.nickname, this.data.nickname + ' has joined this room.');
    this.data.message = '';
  
    firebaseService.getData(this.roomRef).on('value', resp => {
      this.chats = [];
      this.chats = this.firebaseService.snapshotToArray(resp);

      if(this.offStatus === false)
        this.content.scrollToBottom(300);
    });
  }

  sendMessage() {
    this.chatService.sendMessage(this.data.type, this.data.nickname, this.data.message);
    this.data.message = '';
  }

  exitChat() {
    this.chatService.sendMessage('exit', this.nickname, this.nickname+' has exited this room.');
    this.offStatus = true;
    this.navCtrl.setRoot(RoomPage, {
      nickname:this.nickname
    });
  }
}