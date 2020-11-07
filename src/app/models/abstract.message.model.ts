import {UserModel} from './user.model';
import { MessageType } from './types/message.type';

export abstract class AbstractMessageModel {

    channel: string;
    user: UserModel = new UserModel();
    text: string;
    abstract type: MessageType;

}
