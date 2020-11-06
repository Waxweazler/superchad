import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    constructor(private authService: AuthService,
                private route: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit(): void {
        // TODO: this has to be done better..
        this.route.fragment.subscribe(fragment => {
            const accessToken: string = LoginComponent._getFragmentParam(fragment, "access_token");
            if (accessToken) {
                this.router.navigate(["/"]).then(() => {
                    this.authService.authenticate(accessToken);
                });
            }
        });
    }

    isAuthenticated(): boolean {
        return this.authService.authenticated;
    }

    getLoginUrl(): string {
        return this.authService.getAuthUrl();
    }

    private static _getFragmentParam(fragment: string, key: string) {
        return new URLSearchParams(fragment).get(key);
    }

}
