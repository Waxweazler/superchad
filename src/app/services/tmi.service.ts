import {Injectable} from '@angular/core';
import {Client} from 'tmi.js';
import {SystemMessageModel} from '../models/system.message.model';
import {AbstractMessageModel} from '../models/abstract.message.model';
import {UserMessageModel} from '../models/user.message.model';
import {TokenInfo} from 'twitch-auth';
import {CommonUtils} from '../utils/common.utils';

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
            if (!self) {
                return;
            }
            this.addMessage(
                this.createSystemMessage(`You joined ${channel}`)
            );
        });
        this.client.on('part', (channel, username, self) => {
            if (!self) {
                return;
            }
            this.addMessage(
                this.createSystemMessage(`You left ${channel}`)
            );
        });
        this.client.on('chat', (channel, tags, text, self) => {
            const message = new UserMessageModel();
            message.channel = channel;
            message.text = CommonUtils.parseEmotes(text, tags.emotes);
            message.user.name = tags['display-name'];
            message.user.color = tags.color;
            this.addMessage(message);
        });
    }

    send(channel: string, message: string): void {
        this.client.say(channel, message);
    }

    async join(channel: string): Promise<string[]> {
        return await this.client.join(channel);
    }

    part(channel: string): void {
        this.client.part(channel);
    }

    getChannels(): string[] {
        return this.client ? this.client.getChannels() : [];
    }

    private addMessage(message: AbstractMessageModel): void {
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

}
