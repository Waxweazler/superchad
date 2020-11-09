import {AuthProvider, StaticAuthProvider} from 'twitch';
import {environment} from '../../environments/environment';

export class CommonUtils {

    static getAuthProvider(accessToken: string): AuthProvider {
        return new StaticAuthProvider(environment.twitch.clientId, accessToken);
    }

    static getNativeElement(container: any): any {
        return container.nativeElement;
    }

    static getUrlFragmentParam(fragment: string, key: string): string {
        return new URLSearchParams(fragment).get(key);
    }

    static parseEmotes(text, emotes): string {
        let splitText = Array.from(text);
        for (const i in emotes) {
            const e = emotes[i];
            for (const j in e) {
                let mote = e[j];
                if (typeof mote === 'string') {
                    mote = mote.split('-');
                    mote = [parseInt(mote[0]), parseInt(mote[1])];
                    const length = mote[1] - mote[0],
                        empty = Array.apply(null, new Array(length + 1)).map(() => '');
                    splitText = splitText.slice(0, mote[0]).concat(empty).concat(splitText.slice(mote[1] + 1, splitText.length));
                    splitText.splice(mote[0], 1, '<img class="emoticon" src="http://static-cdn.jtvnw.net/emoticons/v1/' + i + '/1.0">');
                }
            }
        }
        return splitText.join('');
    }

}
