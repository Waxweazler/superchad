import {AfterViewInit, Component, ElementRef, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {TmiService} from '../../services/tmi.service';
import {ToastService} from '../../services/toast.service';
import {ScrollService} from '../../services/scroll.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TwitchService} from '../../services/twitch.service';
import {MessageType} from '../../models/types/message.type';
import {ChannelsConfiguration} from '../../configuration/channels.configuration';
import {AbstractMessageVO} from '../../vos/message.abstract.vo';

@Component({
    selector: 'app-chad',
    templateUrl: './chad.component.html',
    styleUrls: ['./chad.component.scss']
})
export class ChadComponent implements AfterViewInit {

    @ViewChild('scrollable', {static: false}) scrollable: ElementRef;
    @ViewChildren('messagesOutput') messagesOutput: QueryList<AbstractMessageVO>;

    scrolledToBottom = true;
    messageForm: FormGroup;
    MessageType = MessageType;

    constructor(private tmiService: TmiService,
                private twitchService: TwitchService,
                private toastService: ToastService,
                private scrollService: ScrollService,
                private formBuilder: FormBuilder,
                private channelsConfiguration: ChannelsConfiguration) {
        this.messageForm = this.formBuilder.group({
            channel: ['', Validators.required],
            message: ['', Validators.required]
        });
    }

    ngAfterViewInit(): void {
        this.messagesOutput.changes.subscribe(_ => {
            this.scrolledToBottom && this.scrollToBottom();
        });
        this.scrollService.onScroll(this.scrollable, toBottom => {
            this.scrolledToBottom = toBottom;
        });
    }

    getMessages(): AbstractMessageVO[] {
        return this.tmiService.getMessages().filter(message => {
            return !this.channelsConfiguration.isHidden(message.channel);
        });
    }

    highlight(message: AbstractMessageVO): void {
        this.toastService.show(message.text, {
            header: message.user.name
        });
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
