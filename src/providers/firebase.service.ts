import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FirebaseService {

    constructor() {

    }
    
    
    getData(str: string): Observable<any[]> {
        return Observable.create(observer => {
            firebase.database().ref(str).on('value', resp => {
                observer.next(this.snapshotToArray(resp));
            });
        });
    }

    snapshotToArray(snapshot) {
        let returnArr = [];

        snapshot.forEach(childSnapshot => {
            let item = childSnapshot.val();
            item.key = childSnapshot.key;
            returnArr.push(item);
        });

        return returnArr;
    };

}