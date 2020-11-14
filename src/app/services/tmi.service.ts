import {Injectable} from '@angular/core';
import {Client} from 'tmi.js';
import {TokenInfo} from 'twitch-auth';
import {CommonUtils} from '../utils/common.utils';
import {BttvService} from './bttv.service';
import {TwitchService} from './twitch.service';
import {Channel, User} from 'twitch';
import {MessagesVO} from '../vos/messages.vo';
import {MessageVO, SystemMessageVO, UserMessageVO} from '../vos/message.vo';

@Injectable({
    providedIn: 'root'
})
export class TmiService {

    private _client: Client;
    private _messages: MessagesVO = new MessagesVO();

    constructor(private bttvService: BttvService,
                private twitchService: TwitchService) {
    }

    async start(accessToken: string, tokenInfo: TokenInfo): Promise<void> {
        this._client = Client({
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
            }
        });
        this._client.on('connected', (address, port) => {
            this._messages.add(
                this.createSystemMessage(`Connected to ${address}:${port}`)
            );
        });
        await this._client.connect();
        this._client.on('join', (channel, username, self) => {
            if (!self) {
                return;
            }
            this._messages.add(
                this.createSystemMessage(`You joined ${channel}`)
            );
        });
        this._client.on('part', (channel, username, self) => {
            if (!self) {
                return;
            }
            this._messages.add(
                this.createSystemMessage(`You left ${channel}`)
            );
        });
        this._client.on('chat', (channel, tags, text, self) => {
            const message = new UserMessageVO();
            message.channel = channel;
            message.text = this.parseMessageForEmotes(text, tags.emotes);
            message.user.name = tags['display-name'];
            message.user.color = tags.color;
            message.user.badges =
                this.twitchService.parseBadges(channel.replace('#', ''), tags['badges-raw']);
            this._messages.add(message);
        });
    }

    send(channel: string, message: string): void {
        this._client.say(channel, message);
    }

    async join(channel: string | Channel | User): Promise<string[]> {
        if (typeof channel === 'string') {
            channel = await this.twitchService.getUserByName(channel);
        }
        await this.twitchService.fetchChannelBadges(channel);
        return await this._client.join(channel.name);
    }

    part(channel: string): void {
        this._client.part(channel);
    }

    getChannels(): string[] {
        return this._client ? this._client.getChannels() : [];
    }

    getMessages(): ReadonlyArray<MessageVO> {
        return this._messages.get();
    }

    private createSystemMessage(text: string): SystemMessageVO {
        const message = new SystemMessageVO();
        message.text = text;
        message.user.name = this._client.getUsername();
        return message;
    }

    private parseMessageForEmotes(message: string, emotes: any): string {
        message = CommonUtils.parseEmotes(message, emotes);
        message = this.bttvService.parseMessage(message);
        return message;
    }

}
