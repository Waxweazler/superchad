import {Injectable} from '@angular/core';
import {NgbToast} from '@ng-bootstrap/ng-bootstrap';

@Injectable({
    providedIn: 'root'
})
export class ToastService {

    private _toasts: NgbToast[] = [];

    show(textOrTpl: string, options: any = {}): void {
        this._toasts.push({textOrTpl, ...options});
    }

    remove(toast): void {
        this._toasts = this._toasts.filter(t => t !== toast);
    }

    getToasts(): NgbToast[] {
        return this._toasts;
    }

}
