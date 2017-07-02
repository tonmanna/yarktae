import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { Routing } from './app.routes';

// View
import { HomeComponent } from './Components/home/home.component';

// Component
import { UploadFileComponent } from './Components/_Shared/uploadfile/uploadfile.component';
import { PreviewPictureComponent } from './Components/_Shared/peviewpicture/previewpicture.component';
import { FirebaseLoginComponent } from './Components/_Shared/firebaselogin/filebaselogin.component';
import { HistoryPictureComponent } from './Components/_Shared/historypicture/historypicture.component';
import { CloudVisionComponent } from './Components/_Shared/cloudvision/cloudvision.component';
import { GoogleSearchComponent } from './Components/_Shared/googlesearch/googlesearch.component';
import { ImageCropperComponent, CropperSettings, Bounds } from 'ng2-img-cropper';

@NgModule({
    imports: [
        BrowserModule, FormsModule, HttpModule, JsonpModule, Routing
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        UploadFileComponent,
        PreviewPictureComponent,
        FirebaseLoginComponent,
        HistoryPictureComponent,
        CloudVisionComponent,
        GoogleSearchComponent,
        ImageCropperComponent
    ],
    bootstrap: [AppComponent]
})

export class AppModule {
    constructor() { }
}
