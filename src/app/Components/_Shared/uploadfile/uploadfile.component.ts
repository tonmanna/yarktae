import { Component, OnInit, ChangeDetectorRef, Input, Output, EventEmitter, ViewChild } from '@angular/core';
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
    public data: any;
    public cropperSettings: any;
    public name: string;
    public croppedWidth: number;
    public croppedHeight: number;

    @ViewChild('cropper', undefined) public cropper: ImageCropperComponent;
    constructor(private chRef: ChangeDetectorRef) {
        this.cropperSettings = new CropperSettings();
        this.cropperSettings.noFileInput = true;
        this.cropperSettings.width = 100;
        this.cropperSettings.height = 100;
        this.cropperSettings.croppedWidth = 1000;
        this.cropperSettings.croppedHeight = 1000;
        this.cropperSettings.canvasWidth = 500;
        this.cropperSettings.canvasHeight = 300;
        this.cropperSettings.minWidth = 10;
        this.cropperSettings.minHeight = 10;
        this.cropperSettings.rounded = false;
        this.cropperSettings.keepAspect = false;
        this.cropperSettings.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
        this.cropperSettings.cropperDrawSettings.strokeWidth = 2;
        this.data = {};
    }

    public cropped(bounds: Bounds) {
        this.croppedHeight = bounds.bottom - bounds.top;
        this.croppedWidth = bounds.right - bounds.left;
    }

    public fileChangeListener($event, status) {
        const myReader: FileReader = new FileReader();
        if (status !== 'upload') {
            console.log('On fileChangeListener :', $event);
            const image: any = new Image();
            const file: File = $event.target.files[0];
            console.log('file11111111111111111:::> ', file.type);

            // const timestamp = new Date()
            //     .getTime()
            //     .toString();
            // var mountainImagesRef = this
            //     .storageRef
            //     .child('images/' + timestamp);
            // var uploadTask = mountainImagesRef.put(file);
            // this.uploadProgress(uploadTask);

            const that = this;
            myReader.onloadend = (loadEvent: any) => {
                image.src = loadEvent.target.result;
                that.cropper.setImage(image);
            };
            myReader.readAsDataURL(file);
        } else {
            console.log('555555555');
            const url = this.data.image;
            const timestamp = new Date().getTime().toString();
            // Usage example:
            this.urltoFile(url, timestamp + '.png', 'image/png').then((files) => {
                if (files) {
                    console.log('file222:::> ', files);

                    const fileupload: File = JSON.parse(JSON.stringify(files));
                    const mountainImagesRef = this.storageRef.child('images/' + timestamp);
                    const uploadTask = mountainImagesRef.put(fileupload);
                    this.uploadProgress(uploadTask);
                }
            });
        }
    }
    public urltoFile(url, filename, mimeType) {
        return (fetch(url)
            .then((res) => {
                /* tslint:disable allow-return-shorthand */
                return res.arrayBuffer();
            })
            .then((buf) => {
                /* tslint:disable allow-return-shorthand */
                return new File([buf], filename, { type: mimeType });
            })
        );
    }
    // Cropper Images.

    public ngOnInit() {
        this.currentProgress = '0';
    }

    public uploadFile(element) {
        // Create a reference to 'images/mountains.jpg'
        if (element.files.length > 0) {
            const timestamp = new Date()
                .getTime()
                .toString();
            const mountainImagesRef = this.storageRef.child('images/' + timestamp + element.files[0].name);
            const file = element.files[0];
            const uploadTask = mountainImagesRef.put(file);
            this.uploadProgress(uploadTask);
        } else {
            alert('Please select file');
        }
    }

    public uploadProgress(uploadTask) {
        const scope = this;
        uploadTask.on('state_changed', (snapshot) => {
            console.log(snapshot.bytesTransferred);
            // Observe state change events such as progress, pause, and resume Get task
            // progress, including the number of bytes uploaded and the total number of
            // bytes to be uploaded
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
