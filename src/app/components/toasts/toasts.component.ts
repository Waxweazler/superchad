import {Component} from '@angular/core';
import {ToastService} from "../../services/toast.service";
import {NgbToast} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'app-toasts',
    templateUrl: './toasts.component.html',
    styleUrls: ['./toasts.component.scss']
})
export class ToastsComponent {

    constructor(private toastService: ToastService) {
    }

    getToasts(): NgbToast[] {
        return this.toastService.toasts;
    }

    remove(toast: NgbToast): void {
        this.toastService.remove(toast);
    }

}
