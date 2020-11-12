import {AbstractMessageVO} from './message.abstract.vo';
import {MessageType} from '../models/types/message.type';

export class UserMessageVO extends AbstractMessageVO {

    type: MessageType = MessageType.USER;

}
