import {AbstractMessageVO} from './message.abstract.vo';
import {MessageType} from './types/message.type';

export class SystemMessageVO extends AbstractMessageVO {

    type: MessageType = MessageType.SYSTEM;

}
