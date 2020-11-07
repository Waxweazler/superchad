import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ToastsComponent} from './toasts.component';
import {ToastService} from '../../services/toast.service';
import {NgbModule, NgbToast} from '@ng-bootstrap/ng-bootstrap';


describe('ToastsComponent', () => {

    let component: ToastsComponent;
    let fixture: ComponentFixture<ToastsComponent>;
    let fixtureElement: HTMLElement;
    let toastServiceSpy: jasmine.SpyObj<ToastService>;

    function createToast(): NgbToast {
        return {header: 'header'} as NgbToast;
    }

    function queryDisplayedToastElements(): NodeListOf<HTMLElement> {
        return fixtureElement.querySelectorAll('.toast.show');
    }

    beforeEach(() => {
        toastServiceSpy = jasmine.createSpyObj('ToastService', ['getToasts', 'remove']);

        TestBed.configureTestingModule({
            declarations: [ToastsComponent],
            providers: [
                {provide: ToastService, useValue: toastServiceSpy}
            ],
            imports: [NgbModule]
        });

        fixture = TestBed.createComponent(ToastsComponent);
        fixtureElement = fixture.nativeElement;
        component = fixture.componentInstance;
    });

    it('toasts can be retrieved', () => {
        const toasts: NgbToast[] = [createToast()];
        toastServiceSpy.getToasts.and.returnValue(toasts);

        expect(component.getToasts()).toEqual(toasts);
        expect(toastServiceSpy.getToasts).toHaveBeenCalled();
    });

    it('toasts can be removed', () => {
        const toast = createToast();

        component.remove(toast);

        expect(toastServiceSpy.remove).toHaveBeenCalledWith(toast);
    });

    it('template updates on toast change', () => {
        expect(queryDisplayedToastElements().length).toBe(0);

        toastServiceSpy.getToasts.and.returnValue([createToast()]);
        fixture.detectChanges();

        expect(queryDisplayedToastElements().length).toBe(1);
    });

});
