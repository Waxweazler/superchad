import {AbstractMessageVO} from './message.abstract.vo';
import {MessageType} from './types/message.type';

export class UserMessageVO extends AbstractMessageVO {

    type: MessageType = MessageType.USER;

}
