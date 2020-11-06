import {Injectable} from "@angular/core";
import {TwitchService} from "./twitch.service";
import {TmiService} from "./tmi.service";
import {environment} from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    authenticated: boolean;

    constructor(private tmiService: TmiService,
                private twitchService: TwitchService) {
    }

    authenticate(accessToken): void {
        this.twitchService.initialize(accessToken);
        this.twitchService.getTokenInfo().then(tokenInfo => {
            this.authenticated = true;
            this.tmiService.start(accessToken, tokenInfo).then(() => {
                this.twitchService.getFollowedStreams().then(streams => {
                    streams.forEach(stream => {
                        this.tmiService.join(stream.channel.displayName);
                    });
                });
            });
        });
    }

    getAuthUrl(): string {
        return `https://id.twitch.tv/oauth2/authorize?client_id=${environment.twitch.clientId}&redirect_uri=${environment.twitch.redirectUri}&response_type=token&scope=chat%3Aread+chat%3Aedit+channel%3Amoderate+whispers%3Aread+whispers%3Aedit+channel_editor+user_read`;
    }

}