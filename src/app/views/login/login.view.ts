import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonUtils} from '../../utils/common.utils';

@Component({
    templateUrl: './login.view.html',
    styleUrls: ['./login.view.scss']
})
export class LoginView implements OnInit {

    constructor(private authService: AuthService,
                private route: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit(): void {
        // TODO: this has to be done better..
        this.route.fragment.subscribe(fragment => {
            const accessToken: string = CommonUtils.getUrlFragmentParam(fragment, 'access_token');
            if (accessToken) {
                this.authService.authenticate(accessToken).then(() => {
                    setTimeout(() => this.router.navigate(['/client']), 1000);
                });
            } else {
                window.location.href = this.authService.getAuthUrl();
            }
        });
    }

}
