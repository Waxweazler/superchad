import {Injectable} from '@angular/core';
import {TwitchService} from './twitch.service';
import {TmiService} from './tmi.service';
import {environment} from '../../environments/environment';
import {BttvService} from './bttv.service';
import {AuthType} from '../vos/types/auth.type';
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private _authenticated: boolean;
    private _status: Subject<AuthType> = new Subject<AuthType>();

    constructor(private _tmiService: TmiService,
                private _twitchService: TwitchService,
                private _bttvService: BttvService) {
    }

    async authenticate(accessToken: string): Promise<void> {
        this._twitchService.initialize(accessToken);

        this._broadcastStatus(AuthType.TWITCH_VALIDATE);
        const tokenInfo = await this._twitchService.getTokenInfo();

        this._broadcastStatus(AuthType.BTTV_LOAD_CONFIGURATION);
        await this._bttvService.fetchConfiguration();

        this._broadcastStatus(AuthType.TWITCH_FETCH_CHANNELS);
        const streams = await this._twitchService.getFollowedStreams();

        this._broadcastStatus(AuthType.TMI_CONNECT);
        await this._tmiService.start(accessToken, tokenInfo);

        this._broadcastStatus(AuthType.TMI_JOIN_CHANNELS);
        for (const stream of streams) {
            await this._tmiService.join(stream.channel);
        }

        this._authenticated = true;
        this._broadcastStatus(AuthType.FINISHED);
    }

    isAuthenticated(): boolean {
        return this._authenticated;
    }

    observeStatus(observer: (AuthType) => void): void {
        this._status.subscribe(observer);
    }

    getAuthUrl(): string {
        return `https://id.twitch.tv/oauth2/authorize?client_id=${environment.twitch.clientId}&redirect_uri=${environment.twitch.redirectUri}&response_type=token&scope=chat%3Aread+chat%3Aedit+channel%3Amoderate+user_read+user_subscriptions`;
    }

    private _broadcastStatus(authType: AuthType): void {
        this._status.next(authType);
    }

}
