import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { CloudVisionService } from "./cloudvision.service";
@Component({
    selector: 'cloud-vision',
    templateUrl: 'cloudvision.component.html',
    providers: [CloudVisionService]
})

export class CloudVisionComponent implements OnInit, OnChanges {
    @Input() imagePath: string;
    @Output() onVisionResult = new EventEmitter<any>();
    constructor(private cloudVisionService: CloudVisionService) { }
    ngOnInit() { }
    ngOnChanges(event) {
        if (event != undefined) {
            if (event.imagePath != undefined) {
                if (event.imagePath.currentValue != undefined) {
                    this.cloudVisionRequest()
                }
            }
        }
    }

    private generateJSON(imagePath): any {
        return {
            "requests": [
                {
                    "features": [
                        {
                            "type": "WEB_DETECTION",
                            "maxResults": 20
                        }
                    ],
                    "image": {
                        "source": {
                            "imageUri": imagePath
                        }
                    }
                }
            ]
        }
    }
    private cloudVisionRequest() {
        const request = this.generateJSON(this.imagePath);
        this.cloudVisionService.cloudVisionRequest(request).subscribe(x => this.onVisionResult.emit(x));
    }

}