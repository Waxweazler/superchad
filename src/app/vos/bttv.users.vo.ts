import {BttvEmoteVO} from './bttv.emote.vo';
import {BttvUserVO} from './bttv.user.vo';

export class BttvUsersVO {

    private _data: BttvUserVO[] = [];
    private _emotes: BttvEmoteVO[];

    add(user: BttvUserVO): void {
        this._data.push(user);
    }

    get emotes(): BttvEmoteVO[] {
        if (!this._emotes) {
            this._emotes = [];
            this._data.forEach(user => {
                this._emotes = this._emotes.concat(user.emotes);
            });
        }
        return this._emotes;
    }

}
