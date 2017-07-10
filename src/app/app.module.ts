import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';
import { AppState, InternalStateType } from './app.service';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppComponent } from './app.component';
import { Routing } from './app.routes';

// View
import { HomeComponent } from './Components/home';

// Component
import { UploadFileComponent } from './Components/_Shared/uploadfile';
import { PreviewPictureComponent } from './Components/_Shared/peviewpicture';
import { FirebaseLoginComponent } from './Components/_Shared/firebaselogin';
import { HistoryPictureComponent } from './Components/_Shared/historypicture';
import { CloudVisionComponent } from './Components/_Shared/cloudvision';
import { GoogleSearchComponent } from './Components/_Shared/googlesearch';
import { ImageCropperComponent, CropperSettings, Bounds } from 'ng2-img-cropper';

@NgModule({
    bootstrap: [AppComponent],
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
    // Import Lib
    imports: [
        BrowserModule, FormsModule, HttpModule, JsonpModule, Routing
    ],
    providers: [
        AppState,
        APP_RESOLVER_PROVIDERS
    ]
})

export class AppModule {
    constructor(public appState: AppState) { }
}
