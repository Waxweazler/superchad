export interface BttvUserResponse extends BttvUser {

    bots: Array<any>,
    channelEmotes: Array<BttvEmoteResponse>,
    sharedEmotes: Array<BttvEmoteResponse>

}

export interface BttvEmoteResponse {

    id: string,
    code: string,
    imageType: string,
    createdAt: string,
    updatedAt: string,
    global: boolean,
    live: boolean,
    sharing: boolean,
    approvalStatus: string,
    user: BttvUser

}

export interface BttvUser {

    id: string,
    name: string,
    displayName: string,
    providerId: string

}