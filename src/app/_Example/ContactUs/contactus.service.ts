import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ContactUsModel } from './contactus.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ContactUsService {
    private getContactUsUrl = '/contactus/getContactUs';  // URL to web API
    private setContactUsUrl = '/contactus/setContactUs';  // URL to web API
    constructor (private http: Http) {}

    getContactUs (): Observable<ContactUsModel> {
        return this.http.get(this.getContactUsUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }
    setContactUs (dataSave: ContactUsModel): Observable<string> {
        const body = JSON.stringify(dataSave);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });

        return this.http.post(this.setContactUsUrl, body, options)
            .map(this.extractStringData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        const body = res.json();
        const result = body || { };
        return result;
    }
    private extractStringData(res: Response) {
        const body = res.text();
        const result = body || '';
        return result;
    }
    private handleError (error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        const errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}
