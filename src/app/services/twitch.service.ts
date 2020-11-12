import {Injectable} from '@angular/core';
import {ApiClient, Channel, ChatBadgeSet, ChatBadgeVersion, Stream, TokenInfo, User} from 'twitch';
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

    async getFollowedStreams(): Promise<Stream[]> {
        return await this._client.kraken.streams.getFollowedStreams();
    }

    async getUserByName(name: string): Promise<User> {
        return await this._client.kraken.users.getUserByName(name);
    }

    async getTokenInfo(): Promise<TokenInfo> {
        return await this._client.getTokenInfo();
    }

    async fetchChannelBadges(channel: Channel | User): Promise<void> {
        this._configuration.setBadges(channel.name,
            await this._client.badges.getChannelBadges(channel));
    }

    parseBadges(channel: string, rawBadges: string): ChatBadgeVersion[] {
        if (!rawBadges) {
            return [];
        }
        const badges: ChatBadgeVersion[] = [];
        rawBadges.split(',').forEach(rawBadge => {
            const badge: string[] = rawBadge.split('/'),
                badgeSet: ChatBadgeSet = this._configuration.getBadges(channel).getBadgeSet(badge[0]);
            if (badgeSet.versionNames.includes(badge[1])) {
                badges.push(badgeSet.getVersion(badge[1]));
            }
        });
        return badges;
    }

}
