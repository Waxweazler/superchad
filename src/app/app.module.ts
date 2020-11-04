import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './components/app.component';
import {ChadComponent} from "./components/chad/chad.component";
import {ReactiveFormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ToastsComponent} from "./components/toasts/toasts.component";
import {SimplebarAngularModule} from "simplebar-angular";
import {ChannelsComponent} from "./components/channels/channels.component";

@NgModule({
    declarations: [
        AppComponent,
        ChadComponent,
        ChannelsComponent,
        ToastsComponent
    ],
    imports: [
        BrowserModule,
        NgbModule,
        ReactiveFormsModule,
        SimplebarAngularModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
