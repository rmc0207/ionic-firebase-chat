import * as firebase from 'firebase';

import { Injectable } from "@angular/core";

@Injectable()
export class FirebaseService {


    createData(ref: string)
    {
        return firebase.database().ref(ref).push();
    }

    getData(ref: string)
    {
        // return firebase.database().ref(ref).on('value', resp => {
        //     return this.snapshotToArray(resp);
        //  });

        return firebase.database().ref(ref);
    }

    snapshotToArray = snapshot => {
        let returnArr = [];
      
        snapshot.forEach(childSnapshot => {
            let item = childSnapshot.val();
            item.key = childSnapshot.key;
            returnArr.push(item);
        });
      
        return returnArr;
      };
}