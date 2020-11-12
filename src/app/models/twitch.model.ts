import {ChatBadgeList} from 'twitch';
import {BadgeModel} from './badge.model';

export class TwitchModel {

    private _badges: BadgeModel[] = [];

    getBadges(channel: string): ChatBadgeList {
        return this._badges.find(badge => {
            return badge.channel === channel;
        }).badges;
    }

    setBadges(channel: string, badges: ChatBadgeList): void {
        this._badges.push({channel, badges});
    }

}
