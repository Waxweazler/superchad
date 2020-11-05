import {Injectable} from "@angular/core";
import {ApiClient, AuthProvider, StaticAuthProvider, Stream} from "twitch";
import {TmiConfiguration} from "../configuration/tmi.configuration";

@Injectable({
    providedIn: 'root'
})
export class TwitchService {

    client: ApiClient = null;
    followedLiveStreams: Array<Stream> = null;

    connect(): void {
        this.client = new ApiClient({
            "authProvider": this.getAuthProvider()
        });
        this.getFollowedStreams();
    }

    getFollowedStreams(): void {
        this.client.kraken.streams.getFollowedStreams().then(streams => {
            this.followedLiveStreams = streams;
        });
    }

    getAuthProvider(): AuthProvider {
        return new StaticAuthProvider(
            TmiConfiguration.options.clientId,
            TmiConfiguration.identity.password.replace("oauth:", "")
        );
    }

}