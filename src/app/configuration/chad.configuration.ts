import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ChadConfiguration {

    private _messageHistoryCount = 200;

    getMessageHistoryCount(): number {
        return this._messageHistoryCount;
    }

}
