import {HttpHelper} from './../HttpHelper';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Injectable} from '@angular/core';
import {Problem2} from './problem2.model';
import {Observable} from 'rxjs/Observable';
import {CG} from '../CG';

@Injectable()
export class Problem2Service extends HttpHelper {
    private getwebsiteByNameUrl = '/service/getwebsiteByName';
    private cg = CG.getInstance();
    constructor(private http : Http) {
        super();
    }

    getwebsiteByName(problem2 : Problem2) : Observable < string > {
        const body = JSON.stringify(problem2);
        const headers = new Headers({'Content-Type': 'application/json'});
        const options = new RequestOptions({headers: headers});

        return this
            .http
            .post(this.getwebsiteByNameUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
}
