import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {HttpHelper} from '../../Models/HttpHelper';
import {CG} from '../../Models/CG';

import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class GoogleSearchService extends HttpHelper {
    private cg = CG.getInstance();
    private customSearchEndpoint = 'https://www.googleapis.com/customsearch/v1?key=' + this.cg.apiKey; // URL to web API
    constructor(private http : Http) {
        super();
    }
    searchRequest(query : any) : Observable < any > {
        const cx = '008050908573220376965:zxblca2x_8m';
        const endpoint = this.customSearchEndpoint + '&cx=' + cx + '&searchType=image&q=' + encodeURIComponent(query);
        return this
            .http
            .get(endpoint)
            .map(this.extractData)
            .catch(this.handleError);
    }
}
