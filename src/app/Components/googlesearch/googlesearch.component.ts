import {
    Component,
    OnInit,
    Input,
    Output,
    OnChanges,
    EventEmitter
} from '@angular/core';
import {GoogleSearchService} from './googlesearch.service';

@Component({selector: 'sg-google-search', template: '', providers: [GoogleSearchService]})

export class GoogleSearchComponent implements OnInit,
OnChanges {
    @Input()keywordList : any[];
    @Output()onGetSearchResult = new EventEmitter < any[] > ();
    constructor(private googleSearch : GoogleSearchService) {}

    ngOnInit() {}

    ngOnChanges(event) {
        if (event !== undefined) {
            if (event.keywordList !== undefined) {
                if (event.keywordList.currentValue !== undefined) {
                    if (this.keywordList.length > 0) {
                        let content = this.keywordList[0].description;
                        if (content === undefined) {
                            content = this.keywordList[1].description;
                        }
                        this
                            .googleSearch
                            .searchRequest(content)
                            .subscribe((x) => {
                                const itemList = [];
                                x
                                    .items
                                    .map((result) => {
                                        result.url = result.link;
                                        itemList.push(result);
                                    });
                                this
                                    .onGetSearchResult
                                    .emit(itemList);
                                console.log('Search Result:', itemList)
                            });
                    }
                }
            }
        }
    }
}