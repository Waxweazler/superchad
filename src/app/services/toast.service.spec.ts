import {TestBed} from '@angular/core/testing';
import {ToastService} from './toast.service';


describe('ToastService', () => {

    let service: ToastService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ToastService);
    });

    it('toasts can be added and removed', () => {
        expect(service.toasts.length).toBe(0);

        service.show('content', {
            header: 'header'
        });

        expect(service.toasts.length).toBe(1);
        expect(service.toasts[0].header).toBe('header');

        service.remove(service.toasts[0]);

        expect(service.toasts.length).toBe(0);
    });

});
