import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './components/app.component';
import {ChadComponent} from "./components/chad/chad.component";
import {ReactiveFormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ToastsComponent} from "./components/toasts/toasts.component";
import {ChannelsComponent} from "./components/channels/channels.component";
import {LoginComponent} from "./components/login/login.component";

@NgModule({
    declarations: [
        AppComponent,
        ChadComponent,
        ChannelsComponent,
        LoginComponent,
        ToastsComponent
    ],
    imports: [
        BrowserModule,
        NgbModule,
        ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
