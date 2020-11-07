import {CanActivate, Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {Injectable} from "@angular/core";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService,
                private router: Router) {
    }

    canActivate(): boolean {
        if (!this.authService.authenticated) {
            this.router.navigate(["/login"]);
        } else {
            return true;
        }
    }

}