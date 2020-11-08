import {Injectable} from '@angular/core';
import {ApiClient, AuthProvider, StaticAuthProvider, Stream, TokenInfo} from 'twitch';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TwitchService {

    private _client: ApiClient = null;

    private static _getAuthProvider(accessToken: string): AuthProvider {
        return new StaticAuthProvider(environment.twitch.clientId, accessToken);
    }

    initialize(accessToken: string): void {
        this._client = new ApiClient({
            authProvider: TwitchService._getAuthProvider(accessToken)
        });
    }

    async getTokenInfo(): Promise<TokenInfo> {
        return await this._client.getTokenInfo();
    }

    async getFollowedStreams(): Promise<Stream[]> {
        return await this._client.kraken.streams.getFollowedStreams();
    }

}
