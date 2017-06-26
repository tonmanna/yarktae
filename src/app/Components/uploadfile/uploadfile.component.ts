import {
    Component,
    OnInit,
    ChangeDetectorRef,
    Input,
    Output,
    EventEmitter
} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

declare var firebase : any;
@Component({selector: 'cmp-upload-file', templateUrl: './uploadfile.component.html'})
export class UploadFileComponent implements OnInit {
    @Output()onUpload = new EventEmitter < string > ();
    private currentProgress : string;
    private storageRef = firebase
        .storage()
        .ref();
    private fileuploadedURL : string;

    constructor(private chRef : ChangeDetectorRef) {}
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
