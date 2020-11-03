import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {MessageModel} from "../../model/message.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {TmiService} from "../../services/tmi.service";
import {MessageType} from "../../type/message.type";

@Component({
    selector: 'chad',
    templateUrl: './chad.component.html',
    styleUrls: ['./chad.component.scss']
})
export class ChadComponent implements AfterViewInit, OnInit {

    // TODO: chad and form
    // TODO: better way for f*cking FormGroup?!
    // TODO: highlight message in modal?!

    @ViewChild('chad', {static: false}) container: ElementRef;
    @ViewChildren('messagesOutput') messagesOutput: QueryList<MessageModel>;
    @ViewChildren('channelsOutput') channelsOutput: QueryList<string>;

    messages: MessageModel[] = [];
    input: FormGroup;
    MessageType = MessageType;

    constructor(private tmiService: TmiService,
                private formBuilder: FormBuilder) {
        this.input = this.formBuilder.group({
            channel: '',
            message: ''
        });
    }

    ngOnInit(): void {
        this.tmiService.connect(message => {
            this.messages.push(message);
        });
    }

    ngAfterViewInit() {
        this.messagesOutput.changes.subscribe(_ => {
            this.scrollContainerToBottom();
        });

        this.channelsOutput.changes.subscribe(data => {
            if (!this.input.value.channel && data.length) {
                this.input.reset({
                    channel: data.first.nativeElement.value
                });
            }
        });
    }

    getChannels(): String[] {
        return this.tmiService.getChannels();
    }

    send(): void {
        this.tmiService.send(this.input.value.channel, this.input.value.message);
        this.input.reset({
            channel: this.input.value.channel
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
