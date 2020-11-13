import {BttvEmoteVO} from './bttv.emote.vo';
import {BttvUserVO} from './bttv.user.vo';

export class BttvUsersVO {

    private _data: BttvUserVO[] = [];

    add(user: BttvUserVO): void {
        this._data.push(user);
    }

    getAllEmotes(): ReadonlyArray<BttvEmoteVO> {
        const result: BttvEmoteVO[] = [];
        this._data.forEach(user => {
            Array.prototype.push.apply(result, user.emotes);
        });
        return result;
    }

}
