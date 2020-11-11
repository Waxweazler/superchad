import {EventEmitter, Injectable} from '@angular/core';
import {TwitchService} from './twitch.service';
import {TmiService} from './tmi.service';
import {environment} from '../../environments/environment';
import {AuthType} from '../models/types/auth.type';
import {BttvService} from './bttv.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private authenticated: boolean;
    status: EventEmitter<AuthType> = new EventEmitter<AuthType>();

    constructor(private tmiService: TmiService,
                private twitchService: TwitchService,
                private bttvService: BttvService) {
    }

    async authenticate(accessToken: string): Promise<void> {
        this.twitchService.initialize(accessToken);

        this.status.emit(AuthType.TWITCH_VALIDATE);
        const tokenInfo = await this.twitchService.getTokenInfo();

        this.status.emit(AuthType.TWITCH_LOAD_CONFIGURATION);
        await this.twitchService.fetchConfiguration();

        this.status.emit(AuthType.TWITCH_FETCH_CHANNELS);
        const streams = await this.twitchService.getFollowedStreams();

        this.status.emit(AuthType.TMI_CONNECT);
        await this.tmiService.start(accessToken, tokenInfo);

        this.status.emit(AuthType.TMI_JOIN_CHANNELS);
        for (const stream of streams) {
            await this.tmiService.join(stream.channel.displayName);
        }

        this.status.emit(AuthType.BTTV_LOAD_CONFIGURATION);
        await this.bttvService.loadConfiguration();

        this.authenticated = true;
        this.status.emit(AuthType.FINISHED);
    }

    isAuthenticated(): boolean {
        return this.authenticated;
    }

    getAuthUrl(): string {
        return `https://id.twitch.tv/oauth2/authorize?client_id=${environment.twitch.clientId}&redirect_uri=${environment.twitch.redirectUri}&response_type=token&scope=chat%3Aread+chat%3Aedit+channel%3Amoderate+user_read+user_subscriptions`;
    }

}
