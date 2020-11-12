import {ChatBadgeList, ChatBadgeVersion} from 'twitch';
import {TwitchBadgeVO} from './twitch.badge.vo';

export class TwitchBadgesVO {

    private _data: TwitchBadgeVO[] = [];

    get(channel: string, set: string, version: string): ChatBadgeVersion {
        const badgeSet = this._find(channel).getBadgeSet(set);
        return badgeSet.versionNames.includes(version) ? badgeSet.getVersion(version) : null;
    }

    add(channel: string, badges: ChatBadgeList): void {
        this._data.push({channel, badges});
    }

    private _find(channel: string): ChatBadgeList {
        return this._data.find(badge => {
            return badge.channel === channel;
        }).badges;
    }

}
