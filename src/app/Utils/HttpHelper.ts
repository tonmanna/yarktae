import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Observable';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
export class HttpHelper {
    protected extractData(res : Response) {
        const body = res.json();
        const result = body || {};
        return result;
    }
    protected extractStringData(res : Response) {
        const body = res.text();
        const result = body || '';
        return result;
    }
    protected handleError(error : any) {
        // In a real world app, we might use a remote logging infrastructure We'd also
        // dig deeper into the error to get a better message
        const errMsg = (error.message)
            ? error.message
            : error.status
                ? `${error.status} - ${error.statusText}`
                : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}
