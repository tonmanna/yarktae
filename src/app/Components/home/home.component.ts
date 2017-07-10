import { Component, OnInit, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare var $: any;
@Component({ templateUrl: './home.component.html' })
export class HomeComponent {
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
        console.log(event);
    }
}
