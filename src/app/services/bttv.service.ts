import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {BttvConfigurationVO} from '../vos/bttv.configuration.vo';
import {BttvUserVO} from '../vos/bttv.user.vo';

@Injectable({
    providedIn: 'root'
})
export class BttvService {

    private _configuration: BttvConfigurationVO = new BttvConfigurationVO();

    constructor(private http: HttpClient) {
    }

    async loadConfiguration(): Promise<void> {
        const user =
            await this.http.get<BttvUserVO>(`https://api.betterttv.net/3/users/${environment.bttv.userId}`).toPromise();
        this._configuration.emotes.add(user.sharedEmotes);
    }

    parseMessage(message: string): string {
        this._configuration.emotes.get().forEach(emote => {
            message = message.replace(new RegExp(emote.code, 'g'),
                `<img alt="${emote.code}" title="${emote.code}" src="https://cdn.betterttv.net/emote/${emote.id}/1x"/>`);
        });
        return message;
    }

}
