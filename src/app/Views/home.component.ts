import {Component, OnInit, Input, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

declare var $ : any;
@Component({templateUrl: './home.component.html'})
export class HomeComponent implements OnInit {
    private imagePath : string; // After Upload
    private credential : any; // After Login

    private imageSimilarList : string[];
    private keywordList : string[];

    private imageList = [];
    constructor() {}
    ngOnInit() {}

    onUpload(event) {
        this.imagePath = event;
        this.imageList = [];
    }

    onLoginSuccess(event) {
        this.credential = event;
    }

    onVisionResult(event) {
        if (event.responses.length > 0) {
            if (event.responses[0].webDetection != undefined) {
                if (event.responses[0].webDetection.visuallySimilarImages != undefined) {
                    this.imageSimilarList = event.responses[0].webDetection.visuallySimilarImages;
                }
                if (event.responses[0].webDetection.webEntities != undefined) {
                    this.keywordList = event.responses[0].webDetection.webEntities;
                }
                this.imageList = this
                    .imageList
                    .concat(this.imageSimilarList);
            }
        } else {
            alert("Unknow picture");
        }
    }

    onGetSearchResult(event) {
        this.imageList = event.concat(this.imageList);
    }

    onPickImage(event) {
        console.log(event);
    }
}
