import { Observable } from 'rxjs/Observable';
import { IQueryString } from 'Models/IQueryString';

export class CG {
    private static instance: CG;
    static getInstance() {
        if (!CG.instance) {
            CG.instance = new CG();
        }
        return CG.instance;
    }

    public extractData(res: Response) {
        const body = res.json();
        const result = body || { };
        return result;
    }

    public extractStringData(res: Response) {
        const body = res.text();
        const result = body || '';
        return result;
    }

    public handleError (error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        const errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }

    private constructor() {
        // prevent someone try to new instatiate this methode
    }
}
// How To used
// let something = new Singleton() // Error: constructor of 'Singleton' is private.
// let instance = Singleton.getInstance() // do something with the instance...
