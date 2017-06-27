import {
    Component,
    OnInit,
    ChangeDetectorRef,
    Input,
    Output,
    EventEmitter
} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

declare var firebase : any;

@Component({selector: 'cmp-firebase-login', templateUrl: './filebaselogin.component.html'})

export class FirebaseLoginComponent {
    @Output()onLoginSuccess = new EventEmitter < any > ();
    private loginStatus : boolean;
    private provider : any;
    constructor(private chRef : ChangeDetectorRef) {
        this.loginStatus = false;
        // Initialize Firebase
        const config = {
            apiKey: 'AIzaSyDdJsqVaII3-RP89gNlBfeSy1V_W-wz_0g',
            authDomain: 'yarktae-52332.firebaseapp.com',
            databaseURL: 'https://yarktae-52332.firebaseio.com',
            projectId: 'yarktae-52332',
            storageBucket: 'yarktae-52332.appspot.com',
            messagingSenderId: '563985708270'
        };
        firebase.initializeApp(config);
        this.provider = new firebase
            .auth
            .FacebookAuthProvider();
        this
            .provider
            .setCustomParameters({'display': 'popup'});
    }
    firebaseLoginClick() {
        const scope = this;
        firebase
            .auth()
            .signInWithPopup(this.provider)
            .then((result) => {
                const token = result.credential.accessToken;
                const user = result.user;
                scope.loginStatus = true;
                scope
                    .onLoginSuccess
                    .emit(result);
                scope
                    .chRef
                    .detectChanges();
            })
            .catch(function (error) {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.email;
                const credential = error.credential;
            });
    }
    firebaseLogoutClick() {
        firebase
            .auth()
            .signOut()
            .then(function () {
                // Sign-out successful.
            })
            .catch(function (error) {
                // An error happened.
            });
    }
}
