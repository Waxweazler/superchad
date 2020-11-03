import {Injectable} from "@angular/core";
import {SimplebarAngularComponent} from "simplebar-angular";

@Injectable({
    providedIn: 'root'
})
export class ScrollService {

    scrollToBottom(container: any): void {
        if (container instanceof SimplebarAngularComponent) {
            container = container.SimpleBar.getScrollElement();
        }
        container.scroll({
            top: container.scrollHeight,
            behavior: 'smooth'
        });
    }

}