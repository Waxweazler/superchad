import {UserVO} from './user.vo';
import {MessageType} from './types/message.type';

export abstract class AbstractMessageVO {

    channel: string;
    user: UserVO = new UserVO();
    text: string;
    abstract type: MessageType;

}
