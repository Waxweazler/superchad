import {UserVO} from './user.vo';
import {MessageType} from './types/message.type';
import {formatDate} from "@angular/common";

export abstract class AbstractMessageVO {

    constructor() {
        this.date = new Date();
    }

    readonly date: Date;
    channel: string;
    user: UserVO = new UserVO();
    text: string;
    abstract type: MessageType;

}
