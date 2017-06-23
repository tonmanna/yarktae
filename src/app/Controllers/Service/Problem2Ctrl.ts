import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {IQueryString} from 'Models/IQueryString';
import {Problem2Service} from '../../Models/Service/problem2.service';
import {Problem2} from '../../Models/Service/problem2.model';

declare var $ : any;
@Component({templateUrl: './Problem2.html', providers: [Problem2Service]})
export class Problem2Component implements OnInit {
    private problem2 = new Problem2();
    constructor(private route : ActivatedRoute, private problem2Repo : Problem2Service) {}
    ngOnInit() {}
    getwebsiteByName() {
        if (this.problem2.price !== undefined) {
            this
                .problem2Repo
                .getwebsiteByName(this.problem2)
                .subscribe((x) => {
                    console.log(x);
                });
        } else {
            alert('Please Enter Price');
        }
    }
}
