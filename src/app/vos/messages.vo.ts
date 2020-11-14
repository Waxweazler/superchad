import {MessageVO} from './message.vo';

export class MessagesVO {

    private _data: MessageVO[] = [];

    add(message: MessageVO): void {
        this._data.push(message);
    }

    get(): ReadonlyArray<MessageVO> {
        return this._data;
    }

}
