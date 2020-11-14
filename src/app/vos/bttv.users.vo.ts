import {BttvEmoteVO} from './bttv.emote.vo';
import {BttvUserVO} from './bttv.user.vo';

export class BttvUsersVO {

    private _data: BttvUserVO[] = [];
    private _emotesCache: BttvEmoteVO[];

    add(user: BttvUserVO): void {
        this._data.push(user);
    }

    getAllEmotes(): BttvEmoteVO[] {
        if (this._emotesCache) {
            return this._emotesCache;
        }
        this._emotesCache = [];
        this._data.forEach(user => {
            this._emotesCache = this._emotesCache.concat(user.emotes);
        });
        return this._emotesCache;
    }

}
