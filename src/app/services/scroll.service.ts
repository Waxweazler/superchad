import {ElementRef, Injectable, QueryList, ViewChildren} from "@angular/core";
import {MessageModel} from "../model/message.model";

@Injectable({
    providedIn: 'root'
})
export class ScrollService {

    container: ElementRef;

    subscribe(queryList: QueryList<MessageModel>): void {
        queryList.changes.subscribe(_ => {
            this.scrollContainerToBottom();
        });
    }

    private scrollContainerToBottom(): void {
        const containerElement = this.container.nativeElement;
        containerElement.scroll({
            top: containerElement.scrollHeight,
            behavior: 'smooth'
        });
    }

}