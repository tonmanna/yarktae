import { Component, OnInit, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare var $: any;
@Component({
    templateUrl: './home.html',
})
export class HomeComponent implements OnInit {
    private imagePath: string;
    constructor(private route: ActivatedRoute) {
    }
    ngOnInit() {

    }
    onUpload(event) {
        this.imagePath = event;
    }
}
