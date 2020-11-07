import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthType} from '../../models/types/auth.type';
import {ProgressModel} from '../../models/progress.model';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

    progress: ProgressModel;

    private static _getFragmentParam(fragment: string, key: string): string {
        return new URLSearchParams(fragment).get(key);
    }

    constructor(private authService: AuthService,
                private route: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit(): void {
        this.authService.status.subscribe((authType: AuthType) => {
            this.setProgress(authType);
        });

        // TODO: this has to be done better..
        this.route.fragment.subscribe(fragment => {
            const accessToken: string = AuthComponent._getFragmentParam(fragment, 'access_token');
            if (accessToken) {
                this.authService.authenticate(accessToken).then(() => {
                    setTimeout(() => this.router.navigate(['/client']), 1000);
                });
            } else {
                window.location.href = this.authService.getAuthUrl();
            }
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
