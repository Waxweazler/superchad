import {BttvEmoteResponse} from '../definitions/bttv';

export class BttvEmoteVO {

    private readonly _data: BttvEmoteResponse;

    constructor(_data: BttvEmoteResponse) {
        this._data = _data;
    }

    get code(): string {
        return this._data.code;
    }

    get imageUrl(): string {
        return `https://cdn.betterttv.net/emote/${this._data.id}/1x`;
    }

}
