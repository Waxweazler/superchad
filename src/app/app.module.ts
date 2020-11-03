import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './components/app.component';
import {ChadComponent} from "./components/chad/chad.component";
import {ReactiveFormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ToastsComponent} from "./components/toasts/toasts.component";
import {MessageComponent} from "./components/message/message.component";

@NgModule({
    declarations: [
        AppComponent,
        ChadComponent,
        MessageComponent,
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
