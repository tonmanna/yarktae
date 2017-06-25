import { Component, OnInit ,ChangeDetectorRef, Input, Output, EventEmitter} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare var firebase: any;

@Component({
    selector: 'firebase-login',
    templateUrl: './filebaselogin.html'
})
export class FirebaseLoginComponent {
    @Output() onLoginSuccess = new EventEmitter<any>();
    private loginStatus: boolean = false;
    private provider: any;
    constructor(private chRef : ChangeDetectorRef) {
        this.loginStatus = false;
        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyDdJsqVaII3-RP89gNlBfeSy1V_W-wz_0g",
            authDomain: "yarktae-52332.firebaseapp.com",
            databaseURL: "https://yarktae-52332.firebaseio.com",
            projectId: "yarktae-52332",
            storageBucket: "yarktae-52332.appspot.com",
            messagingSenderId: "563985708270"
        };
        firebase.initializeApp(config);
        this.provider = new firebase.auth.FacebookAuthProvider();
        this.provider.setCustomParameters({
            'display': 'popup'
        });        
    }
    firebaseLoginClick() {
        var scope = this;
        firebase.auth().signInWithPopup(this.provider).then((result)=>{
            var token = result.credential.accessToken;
            var user = result.user;
            scope.loginStatus = true;
            scope.onLoginSuccess.emit(result);
            scope.chRef.detectChanges();            
        }).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
        });
    }
    firebaseLogoutClick() {
        firebase.auth().signOut().then(function () {
            // Sign-out successful.
        }).catch(function (error) {
            // An error happened.
        });
    }
}
