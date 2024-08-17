import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';


@Injectable()
export class AccountService {
    constructor(private firebaseService: FirebaseService) {}

    login(email, password) {
        return this.firebaseService.authentication.
    }

    // getAccount(email: string) {
    //     return this.firebaseService.authentication.getUser()
    // }

    createAccount(email: string, password: string, firstName: string, lastName: string) {
        return this.firebaseService.authentication.createUser({ email, password, displayName: `${firstName} ${lastName}` })
    }
}
