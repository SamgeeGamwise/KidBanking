import { Inject, Injectable } from '@nestjs/common';
import { app, auth} from 'firebase-admin';
// import firebase from "firebase"

@Injectable()
export class FirebaseService {     
    db: FirebaseFirestore.Firestore;
    collection: FirebaseFirestore.CollectionReference;
    authentication: auth.Auth
  
    constructor(@Inject('FIREBASE_APP') private firebaseApp: app.App) {
      this.db = firebaseApp.firestore();
      this.collection = this.db.collection('banking');
      this.authentication = firebaseApp.auth()
    }
}
