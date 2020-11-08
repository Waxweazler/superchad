import {TestBed} from '@angular/core/testing';
import {TwitchService} from './twitch.service';
import {environment} from '../../environments/environment';
import {ApiClient, Stream, TokenInfo} from 'twitch';
import {StreamApi} from 'twitch/lib/API/Kraken/Stream/StreamApi';
import {StreamData} from 'twitch/lib/API/Kraken/Stream/Stream';
import SpyObj = jasmine.SpyObj;


describe('TwitchService', () => {

    let service: TwitchService;
    const apiClientPropertyName = '_client';

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(TwitchService);
    });

    it('api client can be initialized', () => {
        expect(service[apiClientPropertyName]).toBe(null);

        service.initialize('access_token');

        expect(service[apiClientPropertyName]).not.toBe(null);
        expect(service[apiClientPropertyName].clientId).toBe(environment.twitch.clientId);
    });

    it('token info can be retrieved', () => {
        const apiClientSpy: SpyObj<ApiClient> =
            jasmine.createSpyObj('ApiClient', ['getTokenInfo']);
        const tokenInfo = new TokenInfo(null);

        service[apiClientPropertyName] = apiClientSpy;
        apiClientSpy.getTokenInfo.and.returnValue(Promise.resolve(tokenInfo));

        service.getTokenInfo().then(data => {
            expect(data).toEqual(tokenInfo);
            expect(apiClientSpy.getTokenInfo).toHaveBeenCalled();
        });
    });

    it('followed streams can be retrieved', () => {
        const streamApiSpy: SpyObj<StreamApi> =
            jasmine.createSpyObj('StreamApi', ['getFollowedStreams']);
        const apiClientSpy: SpyObj<ApiClient> =
            jasmine.createSpyObj('ApiClient', [], {
                kraken: jasmine.createSpyObj('KrakenApiGroup', [], {
                    streams: streamApiSpy
                })
            });
        const stream: Stream = new Stream({_id: 1} as StreamData, apiClientSpy);
        const streams: Stream[] = [stream];

        service[apiClientPropertyName] = apiClientSpy;
        streamApiSpy.getFollowedStreams.and.returnValue(Promise.resolve(streams));

        service.getFollowedStreams().then(data => {
            expect(data).toEqual(streams);
            expect(data[0]).toEqual(stream);
            expect(streamApiSpy.getFollowedStreams).toHaveBeenCalled();
        });
    });

});
