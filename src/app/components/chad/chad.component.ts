import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {TmiService} from "../../services/tmi.service";
import {MessageType} from "../../type/message.type";
import {ToastService} from "../../services/toast.service";
import {ScrollService} from "../../services/scroll.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TwitchService} from "../../services/twitch.service";
import {AbstractMessageModel} from "../../model/abstract.message.model";

@Component({
    selector: 'app-chad',
    templateUrl: './chad.component.html',
    styleUrls: ['./chad.component.scss']
})
export class ChadComponent implements AfterViewInit, OnInit {

    @ViewChild('scrollable', {static: false}) scrollable: ElementRef;
    @ViewChildren('messagesOutput') messagesOutput: QueryList<AbstractMessageModel>;

    scrolledToBottom: boolean = true;
    messageForm: FormGroup;
    MessageType = MessageType;

    constructor(private tmiService: TmiService,
                private twitchService: TwitchService,
                private toastService: ToastService,
                private scrollService: ScrollService,
                private formBuilder: FormBuilder) {
        this.messageForm = this.formBuilder.group({
            channel: ['', Validators.required],
            message: ['', Validators.required]
        });
    }

    ngOnInit(): void {
        this.tmiService.connect();
        this.twitchService.connect();
    }

    ngAfterViewInit(): void {
        this.messagesOutput.changes.subscribe(_ => {
            this.scrolledToBottom && this.scrollToBottom();
        });
        this.scrollService.onScroll(this.scrollable, toBottom => {
            this.scrolledToBottom = toBottom;
        });
    }

    getMessages(): AbstractMessageModel[] {
        return this.tmiService.messages;
    }

    highlight(message: AbstractMessageModel): void {
        this.toastService.show(message.text, {
            header: message.user.name
        })
    }

    scrollToBottom(): void {
        this.scrollService.scrollToBottom(this.scrollable);
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
