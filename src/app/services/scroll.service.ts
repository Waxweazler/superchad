import {Injectable} from "@angular/core";
import {SimplebarAngularComponent} from "simplebar-angular";

@Injectable({
    providedIn: 'root'
})
export class ScrollService {

    scrollToBottom(container: any): void {
        container = this._getContainer(container);
        container.scroll({
            top: container.scrollHeight,
            behavior: 'smooth'
        });
    }

    onScroll(container: any, observer: (toBottom: boolean) => void): void {
        container = this._getContainer(container);
        container.addEventListener('scroll', function () {
            observer((container.offsetHeight + container.scrollTop) >= container.scrollHeight - 150);
        });
    }

    private _getContainer(container: any): any {
        if (container instanceof SimplebarAngularComponent) {
            return container.SimpleBar.getScrollElement();
        }
        return container.nativeElement;
    }

}