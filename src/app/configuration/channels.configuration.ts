import {Injectable} from '@angular/core';
import {TmiService} from '../services/tmi.service';

@Injectable({
    providedIn: 'root'
})
export class ChannelsConfiguration {

    private _hidden: string[] = [];

    constructor(private tmiService: TmiService) {
    }

    toggleHidden(channel: string): void {
        if (this.isHidden(channel)) {
            this._show(channel);
        } else {
            this._hide(channel);
        }
    }

    isHidden(channel: string): boolean {
        return this._hidden.includes(channel);
    }

    hideAllBut(channel: string): void {
        this.tmiService.getChannels().forEach(c => {
            this._hide(c);
        });
        this._show(channel);
    }

    showAll(): void {
        this.tmiService.getChannels().forEach(channel => {
            this._show(channel);
        });
    }

    private _hide(channel: string): void {
        this._hidden.push(channel);
    }

    private _show(channel: string): void {
        this._hidden = this._hidden.filter(c => c !== channel);
    }

}
