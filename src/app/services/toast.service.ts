import {Injectable} from '@angular/core';
import {NgbToast} from '@ng-bootstrap/ng-bootstrap';

@Injectable({
    providedIn: 'root'
})
export class ToastService {

    toasts: NgbToast[] = [];

    show(textOrTpl: string, options: any = {}): void {
        this.toasts.push({textOrTpl, ...options});
    }

    remove(toast): void {
        this.toasts = this.toasts.filter(t => t !== toast);
    }

}
