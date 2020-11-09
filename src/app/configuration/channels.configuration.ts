import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ChannelsConfiguration {

    private _hidden: string[] = [];

    toggleHidden(channel: string): void {
        if (this.isHidden(channel)) {
            this._hidden = this._hidden.filter(c => c !== channel);
        } else {
            this._hidden.push(channel);
        }
    }

    isHidden(channel: string): boolean {
        return this._hidden.includes(channel);
    }

}
