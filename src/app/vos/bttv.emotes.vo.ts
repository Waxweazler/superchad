import {BttvEmoteVO} from './bttv.emote.vo';

export class BttvEmotesVO {

    private _data: BttvEmoteVO[] = [];

    add(data: BttvEmoteVO[]): void {
        Array.prototype.push.apply(this._data, data);
    }

    get(): BttvEmoteVO[] {
        return this._data;
    }

}
