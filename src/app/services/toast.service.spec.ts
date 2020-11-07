import {TestBed} from '@angular/core/testing';
import {ToastService} from './toast.service';


describe('ToastService', () => {

    let service: ToastService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ToastService);
    });

    it('toasts can be added and removed', () => {
        expect(service.getToasts().length).toBe(0);

        service.show('content', {
            header: 'header'
        });

        expect(service.getToasts().length).toBe(1);
        expect(service.getToasts()[0].header).toBe('header');

        service.remove(service.getToasts()[0]);

        expect(service.getToasts().length).toBe(0);
    });

});
