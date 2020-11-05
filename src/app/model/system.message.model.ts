import {MessageType} from "../type/message.type";
import {AbstractMessageModel} from "./abstract.message.model";

export class SystemMessageModel extends AbstractMessageModel {

    type: MessageType = MessageType.SYSTEM;

}