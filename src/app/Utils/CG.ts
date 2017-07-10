import { Observable } from 'rxjs/Observable';

export class CG {
    public static instance: CG;
    public static getInstance() {
        if (!CG.instance) {
            CG.instance = new CG();
        }
        return CG.instance;
    }
    public apiKey = 'AIzaSyDdJsqVaII3-RP89gNlBfeSy1V_W-wz_0g';

    private constructor() {
        // prevent someone try to new instatiate this methode
    }
}
// How To used
// let something = new Singleton() // Error: constructor of 'Singleton' is private.
// let instance = Singleton.getInstance() // do something with the instance...
