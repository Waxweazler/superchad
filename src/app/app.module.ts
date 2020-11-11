import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './components/app.component';
import {ChadComponent} from './components/chad/chad.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ToastsComponent} from './components/toasts/toasts.component';
import {ChannelsComponent} from './components/channels/channels.component';
import {RouterModule} from '@angular/router';
import {ClientView} from './views/client/client.view';
import {LoginView} from './views/login/login.view';
import {AuthComponent} from './components/auth/auth.component';
import {AuthGuard} from './guards/auth.guard';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
    declarations: [
        AppComponent,
        AuthComponent,
        ChadComponent,
        ChannelsComponent,
        ToastsComponent,
        ClientView,
        LoginView
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        NgbModule,
        ReactiveFormsModule,
        RouterModule.forRoot([
            {path: 'login', component: LoginView},
            {path: 'client', component: ClientView, canActivate: [AuthGuard]},
            {path: '**', redirectTo: 'client'}
        ])
    ],
    providers: [AuthGuard],
    bootstrap: [AppComponent]
})
export class AppModule {
}
