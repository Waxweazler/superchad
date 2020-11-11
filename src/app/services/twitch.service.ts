import {Injectable} from '@angular/core';
import {ApiClient, ChatBadgeList, ChatBadgeSet, ChatBadgeVersion, Stream, TokenInfo} from 'twitch';
import {CommonUtils} from '../utils/common.utils';
import {TwitchModel} from '../models/twitch.model';

@Injectable({
    providedIn: 'root'
})
export class TwitchService {

    private _client: ApiClient = null;
    private _configuration: TwitchModel = new TwitchModel();

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

    async fetchConfiguration(): Promise<void> {
        this._configuration.globalBadges = await this._fetchGlobalBadges();
    }

    private async _fetchGlobalBadges(): Promise<ChatBadgeList> {
        return await this._client.badges.getGlobalBadges();
    }

    parseBadges(rawBadges: string): ChatBadgeVersion[] {
        if (!rawBadges) {
            return [];
        }
        const globalBadges: ChatBadgeVersion[] = [];
        rawBadges.split(',').forEach(rawBadge => {
            const badge: string[] = rawBadge.split('/'),
                badgeSet: ChatBadgeSet = this._configuration.globalBadges.getBadgeSet(badge[0]);
            if (badgeSet.versionNames.includes(badge[1])) {
                globalBadges.push(badgeSet.getVersion(badge[1]));
            }
        });
        return globalBadges;
    }

}
