import { FirebaseService } from './firebase.service';
import { Injectable } from "@angular/core";

@Injectable()
export class ChatService {

    roomRef: string;

    constructor(private firebaseService: FirebaseService) {
        
    }

    sendMessage(chatType: string, user: string, message: string ) {

        let newData = this.firebaseService.createData(this.roomRef);
        
        newData.set({
            type: chatType,
            user: user,
            message: message,
            sendDate: Date()
        });
    }
}