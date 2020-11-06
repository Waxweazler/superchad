import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TmiService} from "../../services/tmi.service";
import {AuthService} from "../../services/auth.service";

@Component({
    selector: 'app-channels',
    templateUrl: './channels.component.html',
    styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent {

    channelsForm: FormGroup;

    constructor(private formBuilder: FormBuilder,
                private tmiService: TmiService,
                private authService: AuthService) {
        this.channelsForm = this.formBuilder.group({
            channel: ['', Validators.required]
        });
    }

    join(): void {
        this.tmiService.join(this.channelsForm.value.channel);
        this.channelsForm.reset();
    }

    part(channel: string): void {
        this.tmiService.part(channel);
    }

    getChannels(): string[] {
        return this.tmiService.getChannels();
    }

    isAuthenticated(): boolean {
        return this.authService.authenticated;
    }

}
