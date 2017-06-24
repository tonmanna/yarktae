import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'preview-picture',
    templateUrl: './previewpicture.html',
})
export class PreviewPictureComponent implements OnInit {
    @Input() imagePath: string;
    constructor(private route: ActivatedRoute) {
    }
    ngOnInit() {

    }
}
