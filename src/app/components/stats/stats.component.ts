import {Component} from '@angular/core';
import {TwitchService} from "../../services/twitch.service";
import {Stream} from "twitch";
import {TmiService} from "../../services/tmi.service";

@Component({
    selector: 'app-stats',
    templateUrl: './stats.component.html',
    styleUrls: ['./stats.component.scss']
})
export class StatsComponent {

    constructor(private twitchService: TwitchService,
                private tmiService: TmiService) {
    }

    getFollowedLiveStreams(): Array<Stream> {
        return this.twitchService.followedLiveStreams;
    }

    joinStream(stream: Stream): void {
        this.tmiService.join(stream.channel.displayName);
    }

}
