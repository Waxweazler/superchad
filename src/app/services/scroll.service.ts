import {Injectable} from '@angular/core';
import {CommonUtils} from '../utils/common.utils';

@Injectable({
    providedIn: 'root'
})
export class ScrollService {

    scrollToBottom(container: any): void {
        container = CommonUtils.getNativeElement(container);
        container.scroll({
            top: container.scrollHeight
        });
    }

    onScroll(container: any, observer: (toBottom: boolean) => void): void {
        container = CommonUtils.getNativeElement(container);
        container.addEventListener('scroll', () => {
            observer(container.scrollHeight - container.clientHeight <= container.scrollTop);
        });
    }

}
