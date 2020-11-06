import {Component, OnInit} from '@angular/core';
import {TwitchService} from "../../services/twitch.service";
import {TmiService} from "../../services/tmi.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    constructor(private twitchService: TwitchService,
                private tmiService: TmiService) {
    }

    ngOnInit(): void {
        this.tmiService.start().then(() => {
            this.twitchService.start();
        });
    }

}
