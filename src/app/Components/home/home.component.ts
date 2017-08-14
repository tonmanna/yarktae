import { Component, OnInit, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpHelper } from '../../Utils/HttpHelper';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

declare var $: any;

@Component({ templateUrl: './home.component.html' })

export class HomeComponent extends HttpHelper {

    constructor(private http: Http) {
        super();
    }

    public headers;
    public urlImage;
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

        this.mergeImages(url).subscribe((url) => {
            console.log("url: ", url);
            this.urlImage = url;
        });
    }

    public mergeImages(query) {
        var mergeImage = 'https://mergeimages.herokuapp.com/mergeimage?img1=' + this.imagePath + '&img2=' + query;
        // var mergeImage = 'http://localhost:5000/mergeimage?img1=' + this.imagePath + '&img2=' + query;
        return this
            .http
            .get(mergeImage)
            .map((res: Response) => res.text())
            .catch(this.handleError);
    }
}
