import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { GoogleSearchService } from './googlesearch.service';

@Component({
    selector: 'google-search',
    templateUrl: 'googlesearch.component.html',
    providers: [GoogleSearchService]
})

export class GoogleSearchComponent implements OnInit, OnChanges {
    @Input() keywordList: any[];
    @Output() onGetSearchResult = new EventEmitter<any[]>();
    constructor(private googleSearch: GoogleSearchService) { }

    ngOnInit() { }

    ngOnChanges(event) {
        if (event != undefined) {
            if (event.keywordList != undefined) {
                if (event.keywordList.currentValue != undefined) {
                    if (this.keywordList.length > 0) {
                        console.log("DES",this.keywordList[0].description);
                        this.googleSearch.searchRequest(this.keywordList[0].description).subscribe((x) => {
                            var itemList = [];
                            x.items.map((result) => {
                                result.url = result.link;
                                itemList.push(result);
                            });
                            this.onGetSearchResult.emit(itemList);
                            console.log("Search Result:",itemList)
                        });
                    }
                }
            }
        }
    }
}