import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {BttvConfigurationVO} from '../vos/bttv.configuration.vo';
import {BttvUserResponse} from '../definitions/bttv';
import {BttvEmoteVO} from '../vos/bttv.emote.vo';
import {Subject} from 'rxjs';
import {BttvUserVO} from '../vos/bttv.user.vo';

@Injectable({
    providedIn: 'root'
})
export class BttvService {

    private _configuration: BttvConfigurationVO = new BttvConfigurationVO();
    private _emoteSubject: Subject<BttvEmoteVO> = new Subject<BttvEmoteVO>();

    constructor(private http: HttpClient) {
    }

    async fetchConfiguration(): Promise<void> {
        const userResponse = await this.http
                .get<BttvUserResponse>(`https://api.betterttv.net/3/users/${environment.bttv.userId}`).toPromise(),
            user: BttvUserVO = new BttvUserVO(userResponse);
        this._configuration.users.add(user);
    }

    getEmotes(): BttvEmoteVO[] {
        return this._configuration.users.emotes;
    }

    parseMessage(message: string): string {
        this.getEmotes().forEach(emote => {
            message = message.replace(new RegExp(emote.code, 'g'),
                `<img alt="${emote.code}" title="${emote.code}" src="${emote.imageUrl}"/>`);
        });
        return message;
    }

    broadcastEmoteSelection(emote: BttvEmoteVO): void {
        this._emoteSubject.next(emote);
    }

    observeEmoteSelection(observer: (emote: BttvEmoteVO) => void): void {
        this._emoteSubject.subscribe(observer);
    }

}
