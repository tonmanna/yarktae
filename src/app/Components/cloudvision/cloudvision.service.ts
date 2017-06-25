import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpHelper } from '../../Models/HttpHelper';
import { CG } from '../../Models/CG';

import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class CloudVisionService extends HttpHelper {
    private cg = CG.getInstance();
    private cloudVisionEndpoint = 'https://vision.googleapis.com/v1/images:annotate?key='+ this.cg.apiKey;  // URL to web API    

    constructor (private http: Http) {
        super();
    }
    cloudVisionRequest (reqestData:any) : Observable<any>{
        const body = JSON.stringify(reqestData);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        
        return this.http.post(this.cloudVisionEndpoint, body, options)
            .map(this.extractData)
            .catch(this.handleError);        
    }
}