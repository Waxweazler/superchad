import {AbstractMessageModel} from './abstract.message.model';
import {MessageType} from './types/message.type';

export class UserMessageModel extends AbstractMessageModel {

    type: MessageType = MessageType.USER;

}
