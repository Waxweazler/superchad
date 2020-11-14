import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {TmiService} from '../../services/tmi.service';
import {ToastService} from '../../services/toast.service';
import {ScrollService} from '../../services/scroll.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TwitchService} from '../../services/twitch.service';
import {ChannelsConfiguration} from '../../configuration/channels.configuration';
import {MessageType} from '../../vos/types/message.type';
import {ChadConfiguration} from '../../configuration/chad.configuration';
import {BttvService} from '../../services/bttv.service';
import {BttvEmoteVO} from '../../vos/bttv.emote.vo';
import {MessageVO} from '../../vos/message.vo';

@Component({
    selector: 'app-chad',
    templateUrl: './chad.component.html',
    styleUrls: ['./chad.component.scss']
})
export class ChadComponent implements AfterViewInit, OnInit {

    @ViewChild('scrollable') scrollable: ElementRef;
    @ViewChild('messageInput', {static: true}) messageInput: ElementRef;
    @ViewChildren('messagesOutput') messagesOutput: QueryList<MessageVO>;

    scrolledToBottom = true;
    messageForm: FormGroup;
    MessageType = MessageType;

    constructor(private tmiService: TmiService,
                private twitchService: TwitchService,
                private toastService: ToastService,
                private scrollService: ScrollService,
                private formBuilder: FormBuilder,
                private channelsConfiguration: ChannelsConfiguration,
                private chadConfiguration: ChadConfiguration,
                private bttvService: BttvService) {
        this.messageForm = this.formBuilder.group({
            channel: ['', Validators.required],
            message: ['', Validators.required]
        });
    }

    ngOnInit(): void {
        this.bttvService.observeEmoteSelection(emote => this._onEmoteSelection(emote));
    }

    ngAfterViewInit(): void {
        this.messagesOutput.changes.subscribe(_ => {
            this.scrolledToBottom && this.scrollToBottom();
        });
        this.scrollService.onScroll(this.scrollable, toBottom => {
            this.scrolledToBottom = toBottom;
        });
    }

    getMessages(): MessageVO[] {
        return this.tmiService.getMessages().filter(message => {
            return !this.channelsConfiguration.isHidden(message.channel);
        });
    }

    getMessageHistoryCount(): number {
        return this.chadConfiguration.getMessageHistoryCount();
    }

    highlight(message: MessageVO): void {
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
        this.tmiService.send(this._getMessageFormValues().channel, this._getMessageFormValues().message);
        this._changeMessageInputValue('');
    }

    private _onEmoteSelection(emote: BttvEmoteVO): void {
        this._changeMessageInputValue(this._getMessageFormValues().message.concat(emote.code, ' '));
        this._focusMessageInput();
    }

    private _changeMessageInputValue(value: string): void {
        this.messageForm.patchValue({
            message: value
        });
    }

    private _focusMessageInput(): void {
        this.messageInput.nativeElement.focus();
    }

    private _getMessageFormValues(): any {
        return this.messageForm.value;
    }

}
