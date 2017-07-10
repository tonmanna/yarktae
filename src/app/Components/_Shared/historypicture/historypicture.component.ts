import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';

@Component({ selector: 'cmp-history-picture', templateUrl: 'historypicture.component.html', styleUrls: ['historypicture.component.css'] })

export class HistoryPictureComponent {
    @Input() public imageList: string[];
    @Output() public onPickImage = new EventEmitter<any>();

    public pickImage(item) {
        this
            .onPickImage
            .emit(item);
    }
}
