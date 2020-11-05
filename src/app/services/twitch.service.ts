import {Injectable} from "@angular/core";
import {ApiClient, AuthProvider, StaticAuthProvider} from "twitch";
import {TmiConfiguration} from "../configuration/tmi.configuration";
import {TmiService} from "./tmi.service";

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
            TmiConfiguration.options.clientId,
            TmiConfiguration.identity.password.replace("oauth:", "")
        );
    }

}