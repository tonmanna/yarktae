import { Component, ViewEncapsulation, OnInit } from '@angular/core';
declare var $: any;

@Component({
    selector: 'app-main',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    constructor() {
    }
    ngOnInit() {
        setTimeout( () => {
            $('body').show();
        });
    }
}
