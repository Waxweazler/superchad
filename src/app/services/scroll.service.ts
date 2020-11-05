import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ScrollService {

    scrollToBottom(container: any): void {
        container = this._getNativeContainerElement(container);
        container.scroll({
            top: container.scrollHeight
        });
    }

    onScroll(container: any, observer: (toBottom: boolean) => void): void {
        container = this._getNativeContainerElement(container);
        container.addEventListener('scroll', function () {
            observer(container.scrollHeight - container.clientHeight <= container.scrollTop);
        });
    }

    private _getNativeContainerElement(container: any): any {
        return container.nativeElement;
    }

}