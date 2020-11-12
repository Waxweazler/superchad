import {Injectable} from '@angular/core';
import {ApiClient, Channel, ChatBadgeVersion, Stream, TokenInfo, User} from 'twitch';
import {CommonUtils} from '../utils/common.utils';
import {TwitchConfigurationVO} from '../vos/twitch.configuration.vo';

@Injectable({
    providedIn: 'root'
})
export class TwitchService {

    private _client: ApiClient = null;
    private _configuration: TwitchConfigurationVO = new TwitchConfigurationVO();

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
        this._configuration.badges.add(channel.name,
            await this._client.badges.getChannelBadges(channel));
    }

    parseBadges(channel: string, rawBadges: string): ChatBadgeVersion[] {
        if (!rawBadges) {
            return [];
        }
        const badges: ChatBadgeVersion[] = [];
        rawBadges.split(',').forEach(rawBadge => {
            const badgeData: string[] = rawBadge.split('/'),
                badge = this._configuration.badges.get(channel, badgeData[0], badgeData[1]);
            if (badge) {
                badges.push(badge);
            }
        });
        return badges;
    }

}
