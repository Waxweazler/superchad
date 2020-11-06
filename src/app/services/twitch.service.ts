import {Injectable} from "@angular/core";
import {ApiClient, AuthProvider, StaticAuthProvider} from "twitch";
import {TmiService} from "./tmi.service";
import {environment} from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class TwitchService {

    client: ApiClient = null;

    constructor(private tmiService: TmiService) {
    }

    start(): void {
        this.client = new ApiClient({
            "authProvider": this.getAuthProvider()
        });
        this.joinFollowedStreams();
    }

    joinFollowedStreams(): void {
        this.client.kraken.streams.getFollowedStreams().then(streams => {
            streams.forEach(stream => {
                this.tmiService.join(stream.channel.displayName);
            })
        });
    }

    getAuthProvider(): AuthProvider {
        return new StaticAuthProvider(
            environment.twitch.clientId,
            environment.twitch.accessToken
        );
    }

}