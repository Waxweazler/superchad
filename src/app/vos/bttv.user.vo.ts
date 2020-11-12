import {BttvEmoteVO} from './bttv.emote.vo';
import {BttvUserResponse} from '../definitions/bttv';

export class BttvUserVO {

    emotes: BttvEmoteVO[] = [];

    static fromResponse(response: BttvUserResponse): BttvUserVO {
        const user = new BttvUserVO();
        response.sharedEmotes.forEach(r => {
            const emote = new BttvEmoteVO();
            emote.id = r.id;
            emote.code = r.code;
            user.emotes.push(emote);
        });
        return user;
    }

}
