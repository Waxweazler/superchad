import {Injectable, TemplateRef} from "@angular/core";
import {NgbToast} from "@ng-bootstrap/ng-bootstrap";
import {ClassGetter} from "@angular/compiler/src/output/output_ast";

@Injectable({
    providedIn: 'root'
})
export class ToastService {

    toasts: NgbToast[] = [];

    show(textOrTpl: string, options: any = {}) {
        this.toasts.push({textOrTpl, ...options});
    }

    remove(toast): void {
        this.toasts = this.toasts.filter(t => t !== toast);
    }

}