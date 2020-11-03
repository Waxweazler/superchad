import {UserModel} from "./user.model";
import {MessageType} from "../type/message.type";

export class MessageModel {

    channel: string;
    user: UserModel = new UserModel();
    message: string;
    self: boolean;
    type: MessageType;

}