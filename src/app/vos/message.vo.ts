import {UserVO} from './user.vo';
import {MessageType} from './types/message.type';

export abstract class MessageVO {

    constructor() {
        this.date = new Date();
    }

    readonly date: Date;
    channel: string;
    user: UserVO = new UserVO();
    text: string;
    abstract type: MessageType;

}

export class UserMessageVO extends MessageVO {
    type: MessageType = MessageType.USER;
}

export class SystemMessageVO extends MessageVO {
    type: MessageType = MessageType.SYSTEM;
}
