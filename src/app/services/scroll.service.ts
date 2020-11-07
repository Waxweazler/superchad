import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ScrollService {

    private static _getNativeContainerElement(container: any): any {
        return container.nativeElement;
    }

    scrollToBottom(container: any): void {
        container = ScrollService._getNativeContainerElement(container);
        container.scroll({
            top: container.scrollHeight
        });
    }

    onScroll(container: any, observer: (toBottom: boolean) => void): void {
        container = ScrollService._getNativeContainerElement(container);
        container.addEventListener('scroll', () => {
            observer(container.scrollHeight - container.clientHeight <= container.scrollTop);
        });
    }

}
