import { Component, OnInit, ChangeDetectorRef, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageCropperComponent, CropperSettings, Bounds } from 'ng2-img-cropper';

declare var firebase: any;
@Component({
    selector: 'cmp-upload-file',
    templateUrl: './uploadfile.component.html'
})

export class UploadFileComponent implements OnInit {

    @Output() public onUpload = new EventEmitter<string>();
    public currentProgress: string;
    public storageRef = firebase.storage().ref();
    public fileuploadedURL: string;

    // Cropper Images.
    public imageRender: any;
    public cropperSettings: any;
    // public croppedWidth: number;
    // public croppedHeight: number;

    @ViewChild('cropper', undefined) public cropperView: ImageCropperComponent;
    constructor(private chRef: ChangeDetectorRef) {
        this.cropperSettings = new CropperSettings();
        this.cropperSettings.noFileInput = true;
        this.cropperSettings.width = 500;
        this.cropperSettings.height = 500;
        this.cropperSettings.minWidth = 10;
        this.cropperSettings.minHeight = 10;
        this.cropperSettings.croppedWidth = 500;
        this.cropperSettings.croppedHeight = 500;
        this.cropperSettings.canvasWidth = 500;
        this.cropperSettings.canvasHeight = 500;
        this.cropperSettings.rounded = false;
        this.cropperSettings.keepAspect = true;
        this.cropperSettings.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
        this.cropperSettings.cropperDrawSettings.strokeWidth = 2;
        this.imageRender = {};
    }

    // public cropped(bounds: Bounds) {
    //     this.croppedHeight = bounds.bottom - bounds.top;
    //     this.croppedWidth = bounds.right - bounds.left;
    // }

    public fileChangeListener(event) {
        const myReader: FileReader = new FileReader();
        const image: any = new Image();
        const file: File = event.target.files[0];
        const thisScope = this;
        myReader.onloadend = (loadEvent: any) => {
            image.src = loadEvent.target.result;
            thisScope.cropperView.setImage(image);
        };
        myReader.readAsDataURL(file);
    }

    public urltoFile(url, filename, mimeType) {
        return (fetch(url)
            .then((res) => {
                console.log("ENTER1");
                /* tslint:disable allow-return-shorthand */
                return res.arrayBuffer();
            })
            .then((buf) => {
                console.log("ENTER2");
                /* tslint:disable allow-return-shorthand */
                return new File([buf], filename, { type: mimeType });
            })
        );
    }

    public ngOnInit() {
        this.currentProgress = '0';
    }

    public uploadFile(image) {
        const url = this.imageRender.image;
        const fileNameSave = new Date().getTime().toString() + '.png';
        this.urltoFile(url, fileNameSave, 'image/png').then((files) => {
            if (files) {
                const fileupload: File = files;
                const mountainImagesRef = this.storageRef.child('images/' + fileNameSave);
                const uploadTask = mountainImagesRef.put(fileupload);
                this.uploadProgress(uploadTask);
            }
        });
    }

    public uploadProgress(uploadTask) {
        const scope = this;
        uploadTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            scope.currentProgress = progress.toFixed(0);
            scope.chRef.detectChanges();
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
            }
        }, (error) => {
            // Handle unsuccessful uploads
        }, () => {
            scope.fileuploadedURL = uploadTask.snapshot.downloadURL;
            scope.onUpload.emit(scope.fileuploadedURL);
            scope.chRef.detectChanges();
        });
    }
}
