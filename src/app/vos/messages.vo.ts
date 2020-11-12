import {AbstractMessageVO} from './message.abstract.vo';

export class MessagesVO {

    private _data: AbstractMessageVO[] = [];

    add(message: AbstractMessageVO): void {
        if (this._data.length > 200) {
            this._data.shift();
        }
        this._data.push(message);
    }

    get(): AbstractMessageVO[] {
        return this._data;
    }

}
