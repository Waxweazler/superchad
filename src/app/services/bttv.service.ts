import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {BttvUserModel} from '../models/bttv.user.model';

@Injectable({
    providedIn: 'root'
})
export class BttvService {

    private _configuration: BttvUserModel;

    constructor(private http: HttpClient) {
    }

    async loadConfiguration(): Promise<void> {
        this._configuration =
            await this.http.get<BttvUserModel>(`https://api.betterttv.net/3/users/${environment.bttv.userId}`).toPromise();
    }

    parseMessage(message: string): string {
        this._configuration.sharedEmotes.forEach(emote => {
            message = message.replace(new RegExp(emote.code, 'g'),
                `<img alt="${emote.code}" title="${emote.code}" src="https://cdn.betterttv.net/emote/${emote.id}/1x"/>`);
        });
        return message;
    }

}
