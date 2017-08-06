import { Component, OnInit, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Http, Response, Headers, RequestOptions } from '@angular/http';

declare var $: any;

@Component({ templateUrl: './home.component.html' })

export class HomeComponent {

    constructor(private http: Http) {

    }

    public imagePath: string; // After Upload
    public credential: any; // After Login

    public imageSimilarList: string[];
    public keywordList: string[];

    public imageList = [];

    public onUpload(event) {
        this.imagePath = event;
        this.imageList = [];
    }

    public onLoginSuccess(event) {
        this.credential = event;
    }

    public onVisionResult(event) {
        if (event.responses.length > 0) {
            if (event.responses[0].webDetection !== undefined) {
                if (event.responses[0].webDetection.visuallySimilarImages !== undefined) {
                    this.imageSimilarList = event.responses[0].webDetection.visuallySimilarImages;
                }
                if (event.responses[0].webDetection.webEntities !== undefined) {
                    this.keywordList = event.responses[0].webDetection.webEntities;
                }
                this.imageList = this.imageList.concat(this.imageSimilarList);
            }
        } else {
            alert('Unknow picture');
        }
    }

    public onGetSearchResult(event) {
        this.imageList = event.concat(this.imageList);
    }

    public onPickImage(event) {
        var url = "";
        if ("link" in event) {
            console.log(event.link);
            url = event.link;
        } else {
            console.log(event.url);
            url = event.url;
        }
        url
        console.log("Http Get.");
        var test = this.http.get('http://mergeimages.herokuapp.com/mergeimage?img1=http://image.dek-d.com/contentimg/2014/mint/Science/November-December/chicken04.jpg&img2=http://www.rakbankerd.com/kaset/Animal/2850_1.jpg')
        console.log("test:", test);

    }
}
