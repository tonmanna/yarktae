import {Component, OnInit } from '@angular/core';
import {ContactUsModel} from './contactus.model'
import {ContactUsService} from './contactus.service'

@Component({
    selector : 'app-contact-us',
    template : `
    <div class="row">
        <div class="col-md-6 col-lg-6" style="border:solid 1px #ececec;padding: 20px">
            <div class="form-group">
               <label for="formFrom">From</label>
               <input class="form-control" type="text" #fromText [(ngModel)]="fromTextModel"/>
            </div>
            <div class="form-group">
               <label for="formSubject">Subject</label>
               <input class="form-control" type="text" #fromSubject [(ngModel)]="fromSubjectModel"/>
            </div>
            <div class="form-group">
               <label for="exampleInputEmail1">Message</label>
               <textarea class="form-control" cols="40" rows="5" #fromMessage [(ngModel)]="fromMessageModel"></textarea>
            </div>
            <button class="btn btn-default" (click)="onClick(fromText.value,fromSubject.value,fromMessage.value)">Send</button>
        </div>
        <div class="col-md-6 col-lg-6" style="border:solid 1px #ececec;padding: 20px;">
            <div>From : <label>{{fromTextModel}}</label></div>
            <div>Subject : <label>{{fromSubjectModel}}</label></div>
            <div>Message : <label>{{fromMessageModel}}</label></div>
            Error :
            <div class="error" *ngIf="errorMessage">{{errorMessage}}</div>
            <div>=================================================================</div>
            <div> Get Sample data from Server</div>
            <div *ngIf="contactus">From :{{contactus.from}}</div>
            <div *ngIf="contactus">Subject :{{contactus.subject}}</div>
            <div *ngIf="contactus">Message:{{contactus.message}}</div>
        </div>
    </div>
    `,
    providers: [ContactUsService]
})
export class ContactUsComponent implements OnInit {
    errorMessage: string;
    fromTextModel: string;
    fromSubjectModel: string;
    fromMessageModel: string;
    contactus: ContactUsModel;

    constructor(private contactusservice: ContactUsService) {
        this.clearModel()
    };

    ngOnInit() {
    this.getSample();
    }
    clearModel() {
        this.fromTextModel = '';
        this.fromSubjectModel = '';
        this.fromMessageModel = '';
    }

    onClick(from: string, subject: string, message: string) {
        const postData = new ContactUsModel();
        postData.from = from;
        postData.subject = subject;
        postData.message = message;
        this.contactusservice.setContactUs(postData).subscribe( (x) => {
            alert(x);
            this.clearModel();
        });
    };

    getSample() {
        this.contactusservice.getContactUs()
            .subscribe(
                contactusmodel => this.contactus = <ContactUsModel>contactusmodel,
                error =>  this.errorMessage = <any>error);
    };
}
