import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({ selector: 'cmp-preview-picture', templateUrl: './previewpicture.component.html' })
export class PreviewPictureComponent {
    @Input() public imagePath: string;
    constructor(private route: ActivatedRoute) { }
}
