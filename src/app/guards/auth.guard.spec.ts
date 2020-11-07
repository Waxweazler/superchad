import {TestBed} from '@angular/core/testing';
import {AuthGuard} from './auth.guard';
import {Router, RouterModule} from '@angular/router';
import {AuthService} from '../services/auth.service';


describe('AuthGuard', () => {

    let guard: AuthGuard;
    let authServiceSpy: jasmine.SpyObj<AuthService>;
    let routerSpy: jasmine.SpyObj<Router>;

    beforeEach(() => {
        authServiceSpy = jasmine.createSpyObj('AuthService', ['isAuthenticated']);
        routerSpy = jasmine.createSpyObj('Router', ['navigate']);

        TestBed.configureTestingModule({
            imports: [RouterModule.forRoot([])],
            providers: [
                AuthGuard,
                {provide: AuthService, useValue: authServiceSpy},
                {provide: Router, useValue: routerSpy}
            ]
        });
        guard = TestBed.inject(AuthGuard);
    });

    it('navigates to login if user is not authenticated', () => {
        authServiceSpy.isAuthenticated.and.returnValue(false);
        expect(guard.canActivate()).toBe(false);
        expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
    });

    it('lets authenticated user through', () => {
        authServiceSpy.isAuthenticated.and.returnValue(true);
        expect(guard.canActivate()).toBe(true);
    });

});
