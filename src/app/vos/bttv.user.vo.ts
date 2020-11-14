import {BttvUserResponse} from '../definitions/bttv';
import {BttvEmoteVO} from './bttv.emote.vo';

export class BttvUserVO {

    private readonly _data: BttvUserResponse;

    constructor(_data: BttvUserResponse) {
        this._data = _data;
    }

    get emotes(): BttvEmoteVO[] {
        return this._data.sharedEmotes.map(emote => new BttvEmoteVO(emote));
    }

}
