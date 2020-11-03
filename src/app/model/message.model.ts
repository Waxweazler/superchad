import {UserModel} from "./user.model";
import {MessageType} from "../type/message.type";

export class MessageModel {

    channel: String;
    user: UserModel;
    message: String;
    self: boolean;
    type: MessageType;

}