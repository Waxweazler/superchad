import {MessageType} from "../type/message.type";
import {AbstractMessageModel} from "./abstract.message.model";

export class UserMessageModel extends AbstractMessageModel {

    type: MessageType = MessageType.USER;

}