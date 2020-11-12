export class BttvEmoteVO {

    id: string;
    code: string;

    getImageUrl(): string {
        return `https://cdn.betterttv.net/emote/${this.id}/1x`;
    }

}
