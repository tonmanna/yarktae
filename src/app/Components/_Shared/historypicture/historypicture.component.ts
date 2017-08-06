import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';

@Component({
    selector: 'cmp-history-picture',
    templateUrl: 'historypicture.component.html',
    styleUrls: ['historypicture.component.css']
})

export class HistoryPictureComponent {
    @Output() public onPickImage = new EventEmitter<any>();

    constructor() {

    }

    public imageList: string[];
    public imageList1: string[];
    public imageList2: string[];

    @Input('imageList')
    set setimageList(value: string[]) {
        this.imageList = value;
        this.imageList1 = this.imageList.slice(1, this.imageList.length / 2);
        this.imageList2 = this.imageList;
    }

    public pickImage(item) {
        this.onPickImage
            .emit(item);
    }
}
