import {Component} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {AuthType} from '../../models/types/auth.type';
import {ProgressModel} from '../../models/progress.model';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

    progress: ProgressModel;

    constructor(private authService: AuthService) {
        this.authService.status.subscribe((authType: AuthType) => {
            this.setProgress(authType);
        });
    }

    private setProgress(authType: AuthType): void {
        switch (authType) {
            case AuthType.TWITCH_VALIDATE:
                this.progress = {label: 'Validating login', value: 10};
                break;
            case AuthType.TWITCH_FETCH_CHANNELS:
                this.progress = {label: 'Fetching live channels', value: 40};
                break;
            case AuthType.TMI_CONNECT:
                this.progress = {label: 'Connecting to chat server', value: 50};
                break;
            case AuthType.TMI_JOIN_CHANNELS:
                this.progress = {label: 'Joining live channels', value: 80};
                break;
            case AuthType.FINISHED:
                this.progress = {label: 'Enjoy :)', value: 100};
                break;
        }
    }

}
