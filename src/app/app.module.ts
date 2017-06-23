import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { Routing } from './app.routes';

// Controller
import { Problem2Component } from './Controllers/Service/Problem2Ctrl';
import { HomeComponent } from './Controllers/HomeCtrl';

// Shared
import { NavbarComponent } from './Controllers/_Shared/NavbarCtrl';

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
        Problem2Component,
        NavbarComponent
    ],
    bootstrap: [ AppComponent ]
})

export class AppModule { }
