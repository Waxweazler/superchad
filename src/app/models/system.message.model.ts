import {AbstractMessageModel} from './abstract.message.model';
import {MessageType} from './types/message.type';

export class SystemMessageModel extends AbstractMessageModel {

    type: MessageType = MessageType.SYSTEM;

}
