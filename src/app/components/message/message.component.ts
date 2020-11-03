import {AfterViewInit, Component, QueryList, ViewChildren} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {TmiService} from "../../services/tmi.service";

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.scss']
})
export class MessageComponent implements AfterViewInit {

    @ViewChildren('channelsOutput') channelsOutput: QueryList<string>;

    input: FormGroup;

    constructor(private tmiService: TmiService,
                private formBuilder: FormBuilder) {
        this.input = this.formBuilder.group({
            channel: '',
            message: ''
        });
    }

    ngAfterViewInit(): void {
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

}
