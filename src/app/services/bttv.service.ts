import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {BttvConfigurationVO} from '../vos/bttv.configuration.vo';
import {BttvUserVO} from '../vos/bttv.user.vo';
import {map} from 'rxjs/operators';
import {BttvUserResponse} from '../definitions/bttv';
import {BttvEmoteVO} from '../vos/bttv.emote.vo';

@Injectable({
    providedIn: 'root'
})
export class BttvService {

    private _configuration: BttvConfigurationVO = new BttvConfigurationVO();

    constructor(private http: HttpClient) {
    }

    async fetchConfiguration(): Promise<void> {
        const user = await this.http.get<BttvUserResponse>(`https://api.betterttv.net/3/users/${environment.bttv.userId}`)
            .pipe(map(response => BttvUserVO.fromResponse(response))).toPromise();
        this._configuration.users.add(user);
    }

    getEmotes(): ReadonlyArray<BttvEmoteVO> {
        return this._configuration.users.getAllEmotes();
    }

    parseMessage(message: string): string {
        this.getEmotes().forEach(emote => {
            message = message.replace(new RegExp(emote.code, 'g'),
                `<img alt="${emote.code}" title="${emote.code}" src="${emote.getImageUrl()}"/>`);
        });
        return message;
    }

}
