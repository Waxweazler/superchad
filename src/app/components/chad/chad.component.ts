import {AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {MessageModel} from "../../model/message.model";
import {TmiService} from "../../services/tmi.service";
import {MessageType} from "../../type/message.type";
import {ToastService} from "../../services/toast.service";
import {SimplebarAngularComponent} from "simplebar-angular";
import {ScrollService} from "../../services/scroll.service";

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
                private toastService: ToastService,
                private scrollService: ScrollService) {
    }

    ngOnInit(): void {
        this.tmiService.connect(message => {
            if (this.messages.length > 100) {
                this.messages.shift();
            }
            this.messages.push(message);
        });
    }

    ngAfterViewInit(): void {
        this.messagesOutput.changes.subscribe(_ => {
            this.scrollService.scrollToBottom(this.simpleBar);
        });
    }

    highlight(message: MessageModel): void {
        this.toastService.show(message.message, {
            header: message.user.name
        })
    }

}
