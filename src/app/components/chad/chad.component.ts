import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {MessageModel} from "../../model/message.model";
import {TmiService} from "../../services/tmi.service";
import {MessageType} from "../../type/message.type";
import {ToastService} from "../../services/toast.service";

@Component({
    selector: 'chad',
    templateUrl: './chad.component.html',
    styleUrls: ['./chad.component.scss']
})
export class ChadComponent implements AfterViewInit, OnInit {

    // TODO: refactor html
    // TODO: better way for f*cking FormGroup?!

    @ViewChild('chad', {static: false}) container: ElementRef;
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
        const containerElement = this.container.nativeElement;
        containerElement.scroll({
            top: containerElement.scrollHeight,
            behavior: 'smooth'
        });
    }

}
