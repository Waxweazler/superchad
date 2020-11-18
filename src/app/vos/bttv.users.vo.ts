import {BttvEmoteVO} from './bttv.emote.vo';
import {BttvUserVO} from './bttv.user.vo';

export class BttvUsersVO {

    private _data: BttvUserVO[] = [];

    add(user: BttvUserVO): void {
        this._data.push(user);
    }

    get emotes(): BttvEmoteVO[] {
        let emotes: BttvEmoteVO[] = [];
        this._data.forEach(user => {
            emotes = emotes.concat(user.emotes);
        });
        return emotes;
    }

}
