import {Component} from '@angular/core';
import {BttvService} from '../../services/bttv.service';
import {BttvEmoteVO} from '../../vos/bttv.emote.vo';

@Component({
    selector: 'app-bttv',
    templateUrl: './bttv.component.html',
    styleUrls: ['./bttv.component.scss']
})
export class BttvComponent {

    constructor(private _bttvService: BttvService) {
    }

    getEmotes(): ReadonlyArray<BttvEmoteVO> {
        return this._bttvService.getEmotes();
    }

    selectEmote(emote: BttvEmoteVO): void {
        this._bttvService.broadcastEmoteSelection(emote);
    }

}
