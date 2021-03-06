import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TmiService} from '../../services/tmi.service';
import {ChannelsConfiguration} from '../../configuration/channels.configuration';

@Component({
    selector: 'app-channels',
    templateUrl: './channels.component.html',
    styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent {

    channelsForm: FormGroup;

    constructor(private formBuilder: FormBuilder,
                private tmiService: TmiService,
                private channelsConfiguration: ChannelsConfiguration) {
        this.channelsForm = this.formBuilder.group({
            channel: ['', Validators.required]
        });
    }

    join(): void {
        this.channelsForm.disable();
        this.tmiService.join(this.channelsForm.value.channel).then(() => {
            this.channelsForm.reset();
            this.channelsForm.enable();
        });
    }

    part(channel: string): void {
        this.tmiService.part(channel);
    }

    getChannels(): string[] {
        return this.tmiService.getChannels();
    }

    toggleChannelHidden(channel: string): void {
        this.channelsConfiguration.toggleHidden(channel);
    }

    isChannelHidden(channel: string): boolean {
        return this.channelsConfiguration.isHidden(channel);
    }

    hideAllChannelsBut(channel: string): void {
        this.channelsConfiguration.hideAllBut(channel);
    }

    showAllChannels(): void {
        this.channelsConfiguration.showAll();
    }

}
