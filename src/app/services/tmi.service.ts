import {Injectable} from "@angular/core";
import {MessageModel} from "../model/message.model";
import {Subject} from "rxjs";
import {MessageType} from "../type/message.type";
import {Client} from "tmi.js";
import {TmiConfiguration} from "../configuration/tmi.configuration";

@Injectable({
    providedIn: 'root'
})
export class TmiService {

    client: Client = Client(TmiConfiguration);
    messageSubject: Subject<MessageModel> = new Subject<MessageModel>();

    connect(observer: (MessageModel) => void): void {
        this.messageSubject.subscribe(observer);
        this.client.on('connected', (address, port) => {
            const message = new MessageModel();
            message.message = `Connected to ${address}:${port} as ${this.client.getUsername()}`;
            message.type = MessageType.SYSTEM;
            this.messageSubject.next(message);
        });
        this.client.connect().then(_ => {
            this.client.on('join', (channel, username, self) => {
                if (!self) return;
                const message = new MessageModel();
                message.message = `You joined ${channel}`;
                message.type = MessageType.SYSTEM;
                this.messageSubject.next(message);
            });
            this.client.on('chat', (channel, tags, text, self) => {
                console.log(tags);
                const message: MessageModel = {
                    channel: channel,
                    message: this.parseEmotes(text, tags['emotes']),
                    self: self,
                    user: {
                        name: tags['display-name'],
                        color: tags['color']
                    },
                    type: MessageType.USER
                }
                this.messageSubject.next(message);
            });
        });
    }

    send(channel: string, message: string): void {
        this.client.say(channel, message);
    }

    getChannels(): String[] {
        return this.client ? this.client.getChannels() : [];
    }

    private parseEmotes(text, emotes): string {
        var splitText = Array.from(text);// TODO text.split('');
        for (var i in emotes) {
            var e = emotes[i];
            for (var j in e) {
                var mote = e[j];
                if (typeof mote == 'string') {
                    mote = mote.split('-');
                    mote = [parseInt(mote[0]), parseInt(mote[1])];
                    var length = mote[1] - mote[0],
                        empty = Array.apply(null, new Array(length + 1)).map(function () {
                            return ''
                        });
                    splitText = splitText.slice(0, mote[0]).concat(empty).concat(splitText.slice(mote[1] + 1, splitText.length));
                    splitText.splice(mote[0], 1, '<img class="emoticon" src="http://static-cdn.jtvnw.net/emoticons/v1/' + i + '/1.0">');
                }
            }
        }
        return splitText.join('');
    }

}