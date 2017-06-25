import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { Routing } from './app.routes';

// View
import { HomeComponent } from './Views/home';

// Component
import { UploadFileComponent } from './Components/uploadfile/uploadfile';
import { PreviewPictureComponent } from './Components/peviewpicture/previewpicture';
import { FirebaseLoginComponent } from './Components/firebaselogin/filebaselogin';
import { HistoryPictureComponent } from './Components/historypicture/historypicture';
import { CloudVisionComponent } from './Components/cloudvision/cloudvision.component';
import { GoogleSearchComponent } from './Components/googlesearch/googlesearch.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        Routing
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        UploadFileComponent,
        PreviewPictureComponent,
        FirebaseLoginComponent,
        HistoryPictureComponent,
        CloudVisionComponent,
        GoogleSearchComponent
    ],
    bootstrap: [ AppComponent ]
})

export class AppModule {
    constructor(){
        
    }
 }
