import {AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {MessageModel} from "../../model/message.model";
import {TmiService} from "../../services/tmi.service";
import {MessageType} from "../../type/message.type";
import {ToastService} from "../../services/toast.service";
import {SimplebarAngularComponent} from "simplebar-angular";
import {ScrollService} from "../../services/scroll.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-chad',
    templateUrl: './chad.component.html',
    styleUrls: ['./chad.component.scss']
})
export class ChadComponent implements AfterViewInit, OnInit {

    @ViewChild('simpleBar', {static: false}) simpleBar: SimplebarAngularComponent;
    @ViewChildren('messagesOutput') messagesOutput: QueryList<MessageModel>;

    messages: MessageModel[] = [];
    scrolledToBottom: boolean = true;
    messageForm: FormGroup;
    MessageType = MessageType;

    constructor(private tmiService: TmiService,
                private toastService: ToastService,
                private scrollService: ScrollService,
                private formBuilder: FormBuilder) {
        this.messageForm = this.formBuilder.group({
            channel: ['', Validators.required],
            message: ['', Validators.required]
        });
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
            this.scrolledToBottom && this.scrollToBottom();
        });
        this.scrollService.onScroll(this.simpleBar, toBottom => {
            this.scrolledToBottom = toBottom;
        });
    }

    highlight(message: MessageModel): void {
        this.toastService.show(message.message, {
            header: message.user.name
        })
    }

    scrollToBottom(): void {
        this.scrollService.scrollToBottom(this.simpleBar);
    }

    getChannels(): string[] {
        return this.tmiService.getChannels();
    }

    send(): void {
        this.tmiService.send(this.getMessageFormValues().channel, this.getMessageFormValues().message);
        this.messageForm.reset({
            channel: this.getMessageFormValues().channel
        });
    }

    private getMessageFormValues(): any {
        return this.messageForm.value;
    }

}
