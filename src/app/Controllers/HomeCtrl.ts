import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare var $: any;
@Component({
    templateUrl: './Home.html',
})
export class HomeComponent implements OnInit {
    constructor(private route: ActivatedRoute) {
    }
    ngOnInit() {

    }
}
