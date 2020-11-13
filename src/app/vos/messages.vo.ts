import {AbstractMessageVO} from './message.abstract.vo';

export class MessagesVO {

    private _data: AbstractMessageVO[] = [];

    add(message: AbstractMessageVO): void {
        this._data.push(message);
    }

    get(): ReadonlyArray<AbstractMessageVO> {
        return this._data;
    }

}
