import {
    Component,
    OnInit,
    ChangeDetectorRef,
    Input,
    Output,
    EventEmitter,
    ViewChild
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageCropperComponent, CropperSettings, Bounds } from 'ng2-img-cropper';

declare var firebase: any;
@Component({
    selector: 'cmp-upload-file',
    templateUrl: './uploadfile.component.html'
})

export class UploadFileComponent implements OnInit {
    @Output() onUpload = new EventEmitter<string>();
    public currentProgress: string;
    public storageRef = firebase
        .storage()
        .ref();
    private fileuploadedURL: string;

    // Cropper Images. 
    data: any;
    cropperSettings: any;
    name: string;
    croppedWidth: number;
    croppedHeight: number;
    @ViewChild('cropper', undefined) cropper: ImageCropperComponent;
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

    cropped(bounds: Bounds) {
        this.croppedHeight = bounds.bottom - bounds.top;
        this.croppedWidth = bounds.right - bounds.left;
    }

    fileChangeListener($event, status) {
        var myReader: FileReader = new FileReader();
        if (status !== "upload") {
            console.log("On fileChangeListener :", $event);
            var image: any = new Image();
            var file: File = $event.target.files[0];
            console.log('file11111111111111111:::> ', file.type);

            // const timestamp = new Date()
            //     .getTime()
            //     .toString();
            // var mountainImagesRef = this
            //     .storageRef
            //     .child('images/' + timestamp);
            // var uploadTask = mountainImagesRef.put(file);
            // this.uploadProgress(uploadTask);

            var that = this;
            myReader.onloadend = function (loadEvent: any) {
                image.src = loadEvent.target.result;
                that.cropper.setImage(image);
            };
            myReader.readAsDataURL(file);
        } else {
            console.log("555555555");
            var url = this.data.image;
            const timestamp = new Date().getTime().toString();
            //Usage example:
            this.urltoFile(url, timestamp + '.png', 'image/png')
                .then(function (files) {
                    if (files) {
                        console.log('file222:::> ', files);

                        var fileupload: File = JSON.parse(JSON.stringify(files));
                        var mountainImagesRef = this
                            .storageRef
                            .child('images/' + timestamp);
                        var uploadTask = mountainImagesRef.put(fileupload);
                        this.uploadProgress(uploadTask);
                    }
                })
        }
    }
    urltoFile(url, filename, mimeType) {
        return (fetch(url)
            .then(function (res) { return res.arrayBuffer(); })
            .then(function (buf) { return new File([buf], filename, { type: mimeType }); })
        );
    }
    // Cropper Images.

    ngOnInit() {
        this.currentProgress = "0";
    }

    uploadFile(element) {
        // Create a reference to 'images/mountains.jpg'
        if (element.files.length > 0) {
            const timestamp = new Date()
                .getTime()
                .toString();
            var mountainImagesRef = this
                .storageRef
                .child('images/' + timestamp + element.files[0].name);
            var file = element.files[0];
            var uploadTask = mountainImagesRef.put(file);
            this.uploadProgress(uploadTask);
        } else {
            alert('Please select file');
        }
    }

    uploadProgress(uploadTask) {
        const scope = this;
        uploadTask.on('state_changed', function (snapshot) {
            console.log(snapshot.bytesTransferred);
            // Observe state change events such as progress, pause, and resume Get task
            // progress, including the number of bytes uploaded and the total number of
            // bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            scope.currentProgress = progress.toFixed(0);
            scope
                .chRef
                .detectChanges();
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
            }
        }, function (error) {
            // Handle unsuccessful uploads
        }, function () {
            scope.fileuploadedURL = uploadTask.snapshot.downloadURL;
            scope
                .onUpload
                .emit(scope.fileuploadedURL);
            scope
                .chRef
                .detectChanges();
        });
    }
}
