import {Injectable} from "@angular/core";
import {Client} from "tmi.js";
import {SystemMessageModel} from "../models/system.message.model";
import {AbstractMessageModel} from "../models/abstract.message.model";
import {UserMessageModel} from "../models/user.message.model";
import {environment} from "../../environments/environment";
import {TokenInfo} from "twitch-auth";

@Injectable({
    providedIn: 'root'
})
export class TmiService {

    client: Client;
    messages: AbstractMessageModel[] = [];

    async start(accessToken: string, tokenInfo: TokenInfo): Promise<void> {
        this.client = Client({
            options: {
                clientId: tokenInfo.clientId,
                debug: false
            },
            connection: {
                reconnect: true
            },
            identity: {
                username: tokenInfo.userName,
                password: `oauth:${accessToken}`
            },
            channels: [tokenInfo.userName]
        });
        this.client.on('connected', (address, port) => {
            this.addMessage(
                this.createSystemMessage(`Connected to ${address}:${port}`)
            );
        });
        await this.client.connect();
        this.client.on('join', (channel, username, self) => {
            if (!self) return;
            this.addMessage(
                this.createSystemMessage(`You joined ${channel}`)
            );
        });
        this.client.on('part', (channel, username, self) => {
            if (!self) return;
            this.addMessage(
                this.createSystemMessage(`You left ${channel}`)
            );
        });
        this.client.on('chat', (channel, tags, text, self) => {
            const message = new UserMessageModel();
            message.channel = channel;
            message.text = TmiService.parseEmotes(text, tags['emotes']);
            message.user.name = tags['display-name'];
            message.user.color = tags['color'];
            this.addMessage(message);
        });
    }

    send(channel: string, message: string): void {
        this.client.say(channel, message);
    }

    join(channel: string): void {
        this.client.join(channel);
    }

    part(channel: string): void {
        this.client.part(channel);
    }

    getChannels(): string[] {
        return this.client ? this.client.getChannels() : [];
    }

    private addMessage(message: AbstractMessageModel) {
        if (this.messages.length > 200) {
            this.messages.shift();
        }
        this.messages.push(message);
    }

    private createSystemMessage(text: string): SystemMessageModel {
        const message = new SystemMessageModel();
        message.text = text;
        message.user.name = this.client.getUsername();
        return message;
    }

    private static parseEmotes(text, emotes): string {
        let splitText = Array.from(text);
        for (const i in emotes) {
            const e = emotes[i];
            for (const j in e) {
                let mote = e[j];
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