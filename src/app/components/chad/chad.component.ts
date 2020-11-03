import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {MessageModel} from "../../model/message.model";
import {TmiService} from "../../services/tmi.service";
import {MessageType} from "../../type/message.type";
import {ToastService} from "../../services/toast.service";
import {ScrollService} from "../../services/scroll.service";
import {SimplebarAngularComponent} from "simplebar-angular";

@Component({
    selector: 'app-chad',
    templateUrl: './chad.component.html',
    styleUrls: ['./chad.component.scss']
})
export class ChadComponent implements AfterViewInit, OnInit {

    @ViewChild('simpleBar', {static: false}) simpleBar: SimplebarAngularComponent;
    @ViewChildren('messagesOutput') messagesOutput: QueryList<MessageModel>;

    messages: MessageModel[] = [];
    MessageType = MessageType;

    constructor(private tmiService: TmiService,
                private toastService: ToastService) {
    }

    ngOnInit(): void {
        this.tmiService.connect(message => {
            this.messages.push(message);
        });
    }

    ngAfterViewInit(): void {
        this.messagesOutput.changes.subscribe(_ => {
            this.scrollContainerToBottom();
        });
    }

    highlight(message: MessageModel): void {
        this.toastService.show(message.message, {
            header: message.user.name
        })
    }

    private scrollContainerToBottom(): void {
        const containerElement = this.simpleBar.SimpleBar.getScrollElement();
        containerElement.scroll({
            top: containerElement.scrollHeight,
            behavior: 'smooth'
        });
    }

}
