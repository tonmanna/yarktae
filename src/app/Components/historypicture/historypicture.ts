import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';

@Component({
    selector: 'history-picture',
    templateUrl: 'historypicture.html',
    styleUrls: [ "historypicture.css" ]
})

export class HistoryPictureComponent implements OnInit,OnChanges {
    @Input() imageList : string[];
    @Output() onPickImage = new EventEmitter<any>();
    constructor() { }

    ngOnInit() { }
    ngOnChanges(event){}

    pickImage(item){
        this.onPickImage.emit(item);
    }
}