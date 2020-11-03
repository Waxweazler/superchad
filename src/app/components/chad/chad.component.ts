import {AfterViewInit, Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {MessageModel} from "../../model/message.model";
import {TmiService} from "../../services/tmi.service";
import {MessageType} from "../../type/message.type";
import {ToastService} from "../../services/toast.service";
import {ScrollService} from "../../services/scroll.service";

@Component({
    selector: 'app-chad',
    templateUrl: './chad.component.html',
    styleUrls: ['./chad.component.scss']
})
export class ChadComponent implements AfterViewInit, OnInit {

    // TODO: custom scrollbar

    @ViewChildren('messagesOutput') messagesOutput: QueryList<MessageModel>;

    messages: MessageModel[] = [];
    MessageType = MessageType;

    constructor(private tmiService: TmiService,
                private toastService: ToastService,
                private scrollService: ScrollService) {
    }

    ngOnInit(): void {
        this.tmiService.connect(message => {
            this.messages.push(message);
        });
    }

    ngAfterViewInit(): void {
        this.scrollService.subscribe(this.messagesOutput);
    }

    highlight(message: MessageModel): void {
        this.toastService.show(message.message, {
            header: message.user.name
        })
    }

}
