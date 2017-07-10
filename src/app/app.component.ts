import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { AppState } from './app.service';

@Component({
    selector: 'cmp-main',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
    constructor(public appState: AppState) {

    }
    public ngOnInit() {
        console.log('Initial App State', this.appState.state);
    }

}
