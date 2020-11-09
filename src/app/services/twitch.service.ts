import {Injectable} from '@angular/core';
import {ApiClient, Stream, TokenInfo} from 'twitch';
import {CommonUtils} from '../utils/common.utils';

@Injectable({
    providedIn: 'root'
})
export class TwitchService {

    private _client: ApiClient = null;

    initialize(accessToken: string): void {
        this._client = new ApiClient({
            authProvider: CommonUtils.getAuthProvider(accessToken)
        });
    }

    async getTokenInfo(): Promise<TokenInfo> {
        return await this._client.getTokenInfo();
    }

    async getFollowedStreams(): Promise<Stream[]> {
        return await this._client.kraken.streams.getFollowedStreams();
    }

}
